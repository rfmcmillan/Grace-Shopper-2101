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
    const id = req.params.id;
    const product = await Product.getSingleProduct(id);

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
    console.log('req.body:', req.body);
    const {
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
      reqCountry,
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
      where: { name: reqCountry },
    });
    await createProduct.setCountry(country);
    res.status(201).send(createProduct);
  } catch (ex) {
    next(ex);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const productToModify = await Product.findByPk(req.params.id);
    const updated = await productToModify.update(req.body);
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
