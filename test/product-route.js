const chai = require('chai');
const app = require('supertest')(require('../server/server'));
const { expect } = chai;
const {
  db,
  models: { Product },
} = require('../server/db');

describe('Product routes', function () {
  let product;
  beforeEach(async function () {
    try {
      await db.sync({ force: true });
      product = await Product.create({
        title: 'Strawberry Puff',
        brand: 'I-Mei',
        description: 'Crispy puff shell cookie with cream filling.',
        price: 3.99,
        inventory: 100,
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/51GkdanTqfL.jpg',
      });
    } catch (ex) {
      console.log(ex);
    }
  });

  describe('GET ', function () {
    xit('/api/products', async function () {
      const response = await app.get('/api/products').expect(200);
      expect(response.body).to.have.length(1);
    });

    it('/api/products/:id', async function () {
      const response = await app.get(`/api/products/${product.id}`);
      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal('Strawberry Puff');
      // response.body.title?
    });
  });

  describe('POST', function () {
    xit('/api/products/', async function () {
      const response = await app.post('/api/products').send({
        title: 'Grenadine Juice',
        brand: 'Meysu',
        description: 'Juice',
        price: 4.99,
        inventory: 126,
        imageUrl:
          'https://sethlui.com/wp-content/uploads/2019/11/Tiger-Sugar-Boba-Ice-Cream-Online-2.jpg',
      });
      expect(response.body.title).to.equal('Grenadine Juice');
    });
  });

  describe('DELETE', function () {
    xit('/api/products', async function () {
      const toDel = await Product.findOne({
        where: { title: 'Strawberry Puff' },
      });
      const response = await app.delete(`/api/products/${toDel.id}`);
      const products = await Product.findAll();
      expect(response.status).to.equal(204);
    });
  });

  describe('PUT', function () {
    xit('/api/products/:id', async function () {
      const product1 = await Product.findOne({
        where: { title: 'Strawberry Puff' },
      });

      await app
        .put(`/api/products/${product1.id}`)
        .send({ title: 'Lemon Puff' });
      const products = await Product.findAll();
      expect(products[0].title).to.equal('Lemon Puff');
    });
  });
});
