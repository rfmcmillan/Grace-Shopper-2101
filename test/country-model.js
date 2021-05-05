const { expect } = require('chai');
const {
  db,
  models: { Country },
} = require('../server/db');

describe('Country Model', function () {
  beforeEach(async function () {
    try {
      await db.sync({ force: true });
      await Country.create({
        name: 'Turkey',
        flag: 'em-flag-tr',
        latitude: '41.05783371503266',
        longitude: '28.974970047049062',
      });
    } catch (error) {
      console.log(error);
    }
  });

  it('should exist', async function () {
    const country = await Country.findAll();
    expect(country).to.exist;
  });

  it('should return an array', async function () {
    const countries = await Country.findAll();
    expect(countries).to.be.an('array');
    expect(countries.length).to.be.at.least(0);
  });

  it('should require an name', async function () {
    const country = await Country.create({
      name: 'Poland',
      flag: 'em-flag-pl',
      latitude: '51.758933435445556',
      longitude: '19.447782081436248',
    });
    const countries = await Country.findAll();
    expect(countries.length).to.equal(2);
  });
});
