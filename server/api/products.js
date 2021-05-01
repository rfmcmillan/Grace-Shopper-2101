const router = require('express').Router();
const {
  models: { Product, Country },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: [Country] });
    res.send(products);
  } catch (ex) {
    next(ex);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, (include: [Country]));
    res.send(product);
  } catch (ex) {
    next(ex);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const DeleteProduct = await Product.destroy({
      where: { id: req.params.id },
    });
    if (!DeleteProduct) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
      location,
    } = req.body;
    const createProduct = await Product.create({
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
    });
    const [country] = await Country.findOrCreate({
      where: { name: location },
    });
    await createProduct.setCountry(country);
    //Or country[0]
    //Product.addCountry???
    res.status(201).send(createProduct);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
