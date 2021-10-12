const router = require('express').Router();
const {
  models: { Product, Country, Category, User, Review },
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
    const products = await Product.findAll({
      include: [Country, Category, Review],
    });
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

router.delete('/:id', requireToken, async (req, res, next) => {
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
      countryId,
      categories,
    } = req.body;
    const createProduct = await Product.create({
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
      countryId,
    });
    await createProduct.setCategories(categories);

    res.status(201).send(createProduct);
  } catch (ex) {
    next(ex);
  }
});

router.put('/:id', requireToken, async (req, res, next) => {
  try {
    let productToModify = await Product.findByPk(req.params.id, {
      include: [Country, Category],
    });

    const {
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
      countryId,
      categories,
    } = req.body;

    const updated = await productToModify.update({
      title,
      brand,
      description,
      price,
      inventory,
      imageUrl,
      countryId,
    });
    await updated.setCategories(categories);
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
