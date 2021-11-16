const { expect } = require('chai');
const app = require('supertest')(require('../server/server'));
const {
  db,
  models: { Country },
} = require('../server/db');

describe('Country routes', function () {
  let country1;
  let country2;
  beforeEach(async function () {
    try {
      await db.sync({ force: true });
      country1 = await Country.create({
        name: 'Turkey',
        flag: 'em-flag-tr',
        latitude: '41.05783371503266',
        longitude: '28.974970047049062',
      });
      country2 = await Country.create({
        name: 'Poland',
        flag: 'em-flag-pl',
        latitude: '51.758933435445556',
        longitude: '19.447782081436248',
      });
    } catch (ex) {
      console.log(ex);
    }
  });

  describe('GET', function () {
    xit('/api/countries', async function () {
      try {
        const response = await app.get('/api/countries');
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(2);
      } catch (ex) {
        console.log(ex);
      }
    });

    xit('/api/countries/:id', async function () {
      const response = await app.get(`/api/countries/${country1.id}`);
      expect(response.status).to.equal(200);
      expect(response).to.exist;
    });
  });
  describe('POST', function () {
    xit('/api/countries', async function () {
      const name = 'Iran';
      const { body } = await app.post('/api/countries').send({
        name: 'Iran',
        flag: 'em-flag-ir',
        latitude: '35.68502132785435',
        longitude: '51.419159428929696',
      });
      expect(body).to.exist;
      expect(body.name).to.equal(name);
    });

    // it('/api/countries/:id/products/', async () => {
    //     const response = await app
    //         .post('api/countries/:id/products')
    //         .send({
    //             title: 'Grenadine Juice',
    //             brand: 'Meysu',
    //             description: 'Juice',
    //             price: 4.99,
    //             inventory: 126,
    //             imageUrl:
    //                 'https://sethlui.com/wp-content/uploads/2019/11/Tiger-Sugar-Boba-Ice-Cream-Online-2.jpg',
    //             countyId: country1.id,
    //         })
    //     expect(response.body.title).to.equal('Grenadine Juice')
    // })
  });

  describe('DELETE', function () {
    xit('/api/countries', async function () {
      const toDel = await Country.findOne({
        where: { name: 'Turkey' },
      });
      const response = await app.delete(`/api/countries/${toDel.id}`);
      const country = await Country.findAll();
      expect(response.status).to.equal(204);
      expect(country.length).to.equal(1);
    });
  });
});
