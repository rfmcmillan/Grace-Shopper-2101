const router = require('express').Router();
const {
  models: { Order, User },
} = require('../db');

// Purchase Order route
router.post('/purchase', async (req, res, next) => {
  try {
    const {
      date,
      orderId,
      products,
      userId,
    } = req.body;
    const order = await Order.purchase(date, orderId, products, userId);
    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
});

router.get('/cart', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.id);
    const order = await user.findOrder();
    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
});

router.get('/purchases', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.id);
    const purchases = await user.findPurchases();
    res.status(200).send(purchases);
  } catch (err) {
    next(err);
  }
});

router.post('/updateCart', async (req, res, next) => {
  try {
    const { productId, amount, orderId } = req.body;
    const order = await Order.findByPk(orderId);
    await order.updateProductsAmount([productId, amount]);
    res.status(200);
  } catch (err) {
    next(err);
  }
});

router.post('/addToCart', async (req, res, next) => {
  try {
    const { orderId, array } = req.body;
    const order = await Order.findByPk(orderId);
    await order.addProducts(array);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
