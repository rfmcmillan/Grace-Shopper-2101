/* eslint-disable no-console */
const { expect } = require('chai');
const {
  db,
  models: { Product },
} = require('../server/db');

describe('Product Model', function () {
  beforeEach(async function () {
    try {
      await db.sync({ force: true });
      await Product.create({
        title: 'Banana Milk',
        brand: 'Binggrea',
        category: 'sweet',
        description:
                    "The original banana milk, it's a perfect balance of milk and banana.",
        price: 0.49,
        inventory: 250,
        location: 'Korea',
        imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgzZWuHwq6B0_vekrEgP_rQ-I5-ztLcjvuFMyTyvkIuRux4I8mwwF3kTdnZJpHpXgqGiCdK4r6&usqp=CAc',
      });
    } catch (error) {
      console.log(error);
    }
  });

  it('should exist', async function () {
    const product = await Product.findAll();
    expect(product).to.exist;
  });

  it('should return an array', async function () {
    const products = await Product.findAll();
    expect(products).to.be.an('array');
    expect(products.length).to.be.at.least(0);
  });

  it('should require an title', async function () {
    const product = await Product.create({
      title: 'Stroopwafel',
      brand: 'Recette Originale',
      category: 'sweet',
      description:
                ' The waffle component of the stroopwafel tastes sweet and buttery with a hint of cinnamon.',
      price: 5.49,
      inventory: 150,
      location: 'Netherland',
      imageUrl:
                'https://i5.walmartimages.com/asr/4314307a-c489-4ce6-89e0-991fa4db17bd.b2162103afad4685f6522ed633fb576a.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
    });
    const products = await Product.findAll();
    expect(products.length).to.equal(2);
  });
});
