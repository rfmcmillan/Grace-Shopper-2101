const router = require('express').Router();
const {
  models: { Category },
} = require('../db');

// categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send({ categories });
  } catch (error) {
    next(error);
  }
});

// categories/:category
router.get('/:category', async (req, res, next) => {
  try {
    const name = req.params.category;
    const products = await Category.findProducts(name);
    res.status(200).send({ products });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
