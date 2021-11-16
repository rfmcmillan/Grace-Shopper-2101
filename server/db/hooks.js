/* eslint-disable no-plusplus */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

const stripe = require('stripe')(
  'sk_test_51InvgGCzEJe0jWa9qwf4rTyGBxHY1GvAFSTaFniDqqGSJRt1mLTy9hIaLM3gcm7CJNV2T1GenLopTlj1HA9rFDNG00jDxVqD6W'
);
const bcrypt = require('bcrypt');
const {
  Order,
  Product,
  Country,
  ProductOrders,
  Category,
  User,
  Review,
  StripeId,
} = require('./relationships');

Order.addProducts = function (orderId, dupletsarr) {
  const promises = [];
  dupletsarr.forEach(async (i) => {
    const pair = await ProductOrders.findOne({
      where: { orderId, productId: i[0] },
    });
    if (pair) {
      pair.product_amount += i[1];
      await pair.save();
    } else {
      promises.push(
        ProductOrders.create({
          orderId,
          productId: i[0],
          product_amount: i[1],
        })
      );
    }
  });
  Promise.all(promises);
};

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

Order.purchase = async function (date, items, orderId = null, userId = null) {
  try {
    const promises = [];
    let order;
    const jsonobj = [];
    if (!orderId) {
      order = await Order.create({});
      orderId = order.id;
      items.forEach((e) => {
        promises.push(
          ProductOrders.create({
            orderId,
            productId: e.item.id,
            product_amount: e.amount,
          })
        );
      });
      await Promise.all(promises);
    }

    order = await this.findByPk(orderId, { include: [Product] });

    if (userId) {
      order.userId = userId;
    }
    items.forEach((e, i) => {
      jsonobj[i] = { ...e.item };
    });

    order.complete = 'true';
    order.date_of_purchase = date;
    order.purchased_items = jsonobj;

    await order.save();
    if (order.userId) {
      const neworder = await Order.create({ userId: order.userId });
      return neworder.id;
    }
    return null;
  } catch (err) {
    throw new Error(err);
  }
};

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

User.afterCreate(async (user) => {
  const cart = await Order.create({ userId: user.id });
  user.cart = cart.id;
});

User.findPurchases = async function (userId) {
  return Order.findAll({ where: { userId, complete: true } });
};

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
      { model: Category },
      {
        model: Review,
        attributes: ['id', 'rating', 'text', 'userId', 'createdAt'],
        include: {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
      },
    ],
  });
};

Product.afterCreate(async (product) => {
  try {
    const stripeproduct = await stripe.products.create({
      name: product.title,
      images: [product.imageUrl],
    });
    const priceId = await stripe.prices.create({
      billing_scheme: 'per_unit',
      product: stripeproduct.id,
      unit_amount: Math.round(product.price * 100),
      currency: 'usd',
    });
    await StripeId.create({ id: priceId.id, productId: product.id });
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  Order,
  Product,
  ProductOrders,
  Country,
  Category,
  User,
  Review,
  StripeId,
};
