const chai = require('chai');
const expect = chai.expect;
const {
  db,
  models: { Product, Country },
} = require('../server/db');
const app = require('supertest')(require('../server/server'));

describe('Product routes', () => {
  let product1;
  beforeEach(async () => {
    try {
      product = await Product.create({
        title: 'Strawberry Puff',
        brand: 'I-Mei',
        description: 'Crispy puff shell cookie with cream filling.',
        price: 3.99,
        inventory: 100,
        // countryId: Taiwan.id,
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/51GkdanTqfL.jpg',
      });
    } catch (ex) {
      console.log(ex);
    }
  });

  describe('GET ', () => {
    it('/api/products', async () => {
      const response = await app.get('/api/products').expect(200);
      expect(response.body).to.have.length(3);
    });

    it('/api/products/:id', async () => {
      const response = await app.get(`/api/products/${product.id}`);
      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal('Strawberry Puff');
      //response.body.title?
    });
  });

  describe('POST', () => {
    it('/api/products/', async () => {
      const response = await app.post('/api/products').send({
        title: 'Grenadine Juice',
        brand: 'Meysu',
        description: 'Juice',
        price: 4.99,
        inventory: 126,
        imageUrl:
          'https://sethlui.com/wp-content/uploads/2019/11/Tiger-Sugar-Boba-Ice-Cream-Online-2.jpg',
        location: 'Turkey',
      });
      expect(response.body.title).to.equal('Grenadine Juice');
    });
  });

  describe('DELETE', () => {
    it('/api/products', async () => {
      const toDel = await Product.findOne({
        where: { title: 'Strawberry Puff' },
      });
      const response = await app.delete(`/api/products/${toDel.id}`);
      const products = await Product.findAll();
      expect(response.status).to.equal(204);
    });
  });
});
