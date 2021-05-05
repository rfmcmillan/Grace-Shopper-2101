/* eslint-disable no-plusplus */
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

Order.addProducts = function (orderId, dupletsarr) {
  const promises = [];
  dupletsarr.forEach(async (i) => {
    const pair = await ProductOrders.findOne({
      where: { orderId, productId: i[0] },
    });
    if (pair) {
      pair.product_amount++;
      pair.save();
    } else {
      promises.push(
        ProductOrders.create({
          orderId,
          productId: i[0],
          product_amount: i[1],
        }),
      );
    }
  });
  return Promise.all(promises);
};

// an instance method designed to remove products from an order based on the amount
Order.updateProductsAmount = async function (orderId, productId, amount) {
  try {
    const pair = await ProductOrders.findOne({
      where: { orderId, productId },
    });
    if (amount === 0) {
      return pair.destroy();
    }
    pair.product_amount = amount;
    return pair.save();
  } catch (err) {
    throw new Error(err);
  }
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
  try {
    let order;
    const jsonobj = [];
    if (!orderId) {
      order = await Order.create({});
      await Order.addProducts(order.id, products);
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
    // create a new order for verified users
    if (order.userId) {
      Order.create({ userId: order.userId });
    }

    return order;
  } catch (err) {
    throw new Error(err);
  }
};

// an added hook to hash the password if it is changed using save() or if it is created
User.beforeSave(async (user) => {
  try {
    if (user.changed('password')) {
      const hash = await bcrypt.hash(user.password, 2);
      user.password = hash;
    }
  } catch (err) {
    throw new Error(err);
  }
});

// a hook for users to create an order after the user is created so
// there is always an empty order in the database to be used by the cart on the client side
User.afterCreate(async (user) => {
  const cart = await Order.create({ userId: user.id });
  user.cart = cart.id;
});

// returns all completed purchases
User.findPurchases = async function (userId) {
  return Order.findAll({ where: { userId, complete: true } });
};
// a class method for users to find the active open order
// this might need review becuase it may be way over engineered haha
User.getCart = async function (orderId) {
  try {
    const returnobj = [];
    const order = await Order.findByPk(orderId, {
      include: {
        all: true,
        nested: true,
      },
    });
    order.products.forEach((e) => {
      returnobj.push({
        ...e.dataValues,
        amount: e.productorders.product_amount,
      });
    });
    return returnobj;
  } catch (err) {
    throw new Error('no cart found Error:', err);
  }
};

Order.afterCreate(async (order) => {
  try {
    if (order.userId && order.complete === false) {
      const user = await User.findByPk(order.userId);
      user.cart = order.id;
      await user.save();
    }
  } catch (err) {
    console.log(err);
  }
});
Product.getSingleProduct = function (id) {
  return Product.findByPk(id, {
    include: [
      { model: Country },
      {
        model: Review,
        attributes: ['id', 'rating', 'text', 'userId'],
        include: {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
      },
    ],
  });
};

module.exports = {
  Order,
  Product,
  ProductOrders,
  Country,
  Category,
  User,
  Review,
};
