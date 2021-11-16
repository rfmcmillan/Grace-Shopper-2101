const router = require('express').Router();
const {
  models: { Category, User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.byToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send({ categories });
  } catch (error) {
    next(error);
  }
});

router.get('/:category', async (req, res, next) => {
  try {
    const name = req.params.category;
    const products = await Category.findProducts(name);
    res.status(200).send({ products });
  } catch (error) {
    next(error);
  }
});

router.post('/', requireToken, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).send(newCategory);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', requireToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const toDestroy = await Category.findByPk(id);
    await toDestroy.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
router.put('/:id', requireToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    const { name } = req.body;
    const updated = await category.update({ name });
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
