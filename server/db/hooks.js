/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
// import models from relationships
const bcrypt = require('bcrypt');
const {
  Order,
  Product,
  Country,
  ProductOrders,
  Category,
  User,
  Review,
} = require('./relationships');

// export models

/* an instance method to add products to an order,
this accepts an array of duplets ex [[product, amount], [product2, amount]] */

Order.prototype.addProducts = function (dupletsarr) {
  const promises = [];
  dupletsarr.forEach((i) => {
    promises.push(
      ProductOrders.create({
        orderId: this.id,
        productId: i[0].id,
        product_amount: i[1],
      }),
    );
  });
  return Promise.all(promises);
};

// an instance method designed to remove products from an order based on the amount
Order.prototype.updateProductsAmount = async function (product, amount) {
  const pair = await ProductOrders.findOne({
    where: { orderId: this.id, productId: product.id },
  });
  if (amount === 0) {
    await pair.destroy();
    return;
  }
  pair.product_amount = amount;
  await pair.save();
};

// // a class method for orders that causes the order to
// be marked as purchased and saves a snapshot of the ordert details.
// // addtionally if there is a user linked to the
Order.purchase = async function (
  date,
  orderId = null,
  products = [],
  userId = null,
) {
  let order;
  const jsonobj = [];
  if (!orderId) {
    order = await Order.create({});
    await order.addProducts(products);
    orderId = order.id;
  }
  order = await this.findByPk(orderId, { include: [Product] });
  if (userId) {
    order.userId = userId;
  }
  order.products.forEach((e, i) => {
    jsonobj[i] = { ...e.dataValues, amount: e.productorders.product_amount };
  });

  order.complete = 'true';
  order.date_of_purchase = date;
  order.purchased_items = jsonobj;

  await order.save();

  if (order.userId) {
    Order.create({ userId: order.userId });
  }

  return order;
};

// a hook to hash the User password before creation so it is always stored in the database encrypted
User.beforeCreate(async (user) => {
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  } catch (err) {
    throw new Error(err);
  }
});

// an added hook to hash the password if it is changed using save()
User.beforeSave(async (user) => {
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  } catch (err) {
    throw new Error(err);
  }
});

// // a hook for users to create an order after the user is created so
// there is always an empty order in the database to be used by the cart on the client side
User.afterCreate(async (user) => {
  await Order.create({ userId: user.id });
});

// a class method for users to find the active open order
// this might need review becuase it may be way over engineered haha
User.prototype.findOrder = async function () {
  let order = (
    await this.getOrders({ where: { complete: false }, include: [Product] })
  )[0];
  const returnobj = [];
  order = await Order.findOne({ where: { id: order.id }, include: Product });
  order.products.forEach((e) => {
    returnobj.push({
      ...e.dataValues,
      amount: e.productorders.product_amount,
    });
  });
  return returnobj;
};

module.exports = {
  Order, Product, ProductOrders, Country, Category, User, Review,
};
