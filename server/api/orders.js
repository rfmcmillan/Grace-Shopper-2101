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
    res.status(200).send({ order });
  } catch (err) {
    next(err);
  }
});

router.get('/cart/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await User.getCart(id);
    res.status(200).send({ cart });
  } catch (err) {
    next(err);
  }
});

router.get('/purchases/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const purchases = await User.findPurchases(id);
    res.status(200).send({ purchases });
  } catch (err) {
    next(err);
  }
});

router.put('/updateCart', async (req, res, next) => {
  try {
    const { orderId, productId, amount } = req.body;
    await Order.updateProductsAmount(orderId, productId, amount);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.put('/addToCart', async (req, res, next) => {
  try {
    const { orderId, products } = req.body;
    await Order.addProducts(orderId, products);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;