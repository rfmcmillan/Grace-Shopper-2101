/* eslint-disable no-useless-catch */
const { expect } = require('chai');
const app = require('supertest')(require('../server/server'));
const {
  db,
  models: { Review, User, Product },
} = require('../server/db');

describe('Review Model', function () {
  beforeEach(async function () {
    try {
      await db.sync({ force: true });
      await User.create({
        email: 'henry@snacker.com',
        password: 'henry_pw',
      });
      await Review.create({
        rating: 5,
      });
    } catch (error) {
      throw error;
    }
  });

  it('should exist', async function () {
    const reviews = await Review.findAll();
    expect(reviews).to.exist;
  });

  it('Review.findAll() should return an array of reviews', async function () {
    const reviews = await Review.findAll();
    expect(reviews).to.be.an('array');
    expect(reviews.length).to.be.at.least(0);
  });

  it('rating must be between 1 and 5', async function () {
    await Review.create({
      rating: 4,
    });
    const reviews = await Review.findAll();
    expect(reviews.length).to.equal(2);
  });
  describe('Associations', function () {
    it('review has a userId that is initially null', async function () {
      const review = await Review.create({
        rating: 4,
      });
      expect(review.userId).to.equal(null);
    });
    it('review has a productId that is initially null', async function () {
      const review = await Review.create({
        rating: 4,
      });
      expect(review.productId).to.equal(null);
    });
  });

  describe('.writeNew() class method', function () {
    beforeEach(async function () {
      try {
        await Product.create({
          title: 'puff',
          brand: 'stay-puft',
          description: 'tasty',
          price: 1.1,
          country: 'usa',
        });
      } catch (error) {
        throw new Error(error);
      }
    });
    it('returns a new review', async function () {
      const henry = await User.findOne({
        where: {
          email: 'henry@snacker.com',
        },
      });
      const puff = await Product.findOne({
        where: {
          title: 'puff',
        },
      });
      const review = await Review.writeNew(henry.id, puff.id, 5, 'test');
      expect(review.id).to.be.ok;
    });
    it('produces an error if no userId is provided', async function () {
      try {
        const puff = await Product.findOne({
          where: {
            title: 'puff',
          },
        });
        await Review.writeNew(null, puff.id, 4, 'test');
      } catch (error) {
        expect(error.message).to.equal('a review requires a userId');
      }
    });
    it('produces an error if no productId is provided', async function () {
      try {
        const henry = await User.findOne({
          where: {
            email: 'henry@snacker.com',
          },
        });
        await Review.writeNew(henry.id, null, 4, 'test');
      } catch (error) {
        expect(error.message).to.equal('a review requires a productId');
      }
    });
    it('produces an error if no rating is provided', async function () {
      try {
        const henry = await User.findOne({
          where: {
            email: 'henry@snacker.com',
          },
        });
        const puff = await Product.findOne({
          where: {
            title: 'puff',
          },
        });
        await Review.writeNew(henry.id, puff.id, null, 'test');
      } catch (error) {
        expect(error.message).to.equal('a review requires a rating');
      }
    });
  });

  describe('Review Routes', function () {
    beforeEach(async function () {
      const user = await User.create({
        email: 'rosie@snacker.com',
        password: '123ert',
      });
      const product = await Product.create({
        title: 'puff',
        brand: 'stay-puft',
        description: 'tasty',
        price: 1.1,
        country: 'usa',
      });
      await Review.writeNew(user.id, product.id, 4, 'So good!');
    });
    describe('GET', function () {
      it('api/reviews', async function () {
        const response = await app.get('/api/reviews');
        const reviews = response.body;
        expect(response.status).to.equal(200);
        expect(reviews).to.be.ok;
        expect(reviews).to.be.an('array');
      });
      it('api/reviews/:id', async function () {
        const user = await User.create({
          email: 'tom@snacker.com',
          password: '123ert',
        });
        const product = await Product.create({
          title: 'puff',
          brand: 'stay-puft',
          description: 'tasty',
          price: 1.1,
          country: 'usa',
        });
        const review = await Review.writeNew(
          user.id,
          product.id,
          4,
          'So good!',
        );

        const response = await app.get(`/api/reviews/${review.id}`);
        const { body } = response;
        expect(response.status).to.equal(200);
        expect(body).to.be.ok;
        expect(body).to.be.an('object');
        expect(body.rating).to.be.ok;
      });
    });
    describe('POST', function () {
      it('api/reviews', async function () {
        const jeff = await User.create({
          email: 'jeff@snacker.com',
          password: 'jeff_pw',
        });

        const cheeto = await Product.create({
          title: 'cheeto',
          brand: 'stay-puft',
          description: 'tasty',
          price: 1.1,
          country: 'usa',
        });

        const response = await app.post('/api/reviews').send({
          userId: jeff.id,
          productId: cheeto.id,
          rating: 4,
          text: 'Really good snack',
        });
        const newReview = response.body;
        expect(response.status).to.equal(201);
        expect(newReview).to.be.ok;
        expect(newReview).to.be.an('object');
      });
    });
    describe('DELETE', function () {
      it('api/reviews/:id', async function () {
        const user = await User.create({
          email: 'tom@snacker.com',
          password: '123ert',
        });
        const product = await Product.create({
          title: 'puff',
          brand: 'stay-puft',
          description: 'tasty',
          price: 1.1,
          country: 'usa',
        });
        const review = await Review.writeNew(
          user.id,
          product.id,
          4,
          'So good!',
        );
        const { body } = await app.get(`/api/reviews/${review.id}`);
        expect(body.text).to.equal('So good!');
        const deleteResponse = await app.delete(`/api/reviews/${review.id}`);
        expect(deleteResponse.status).to.equal(204);
        expect(await Review.findByPk(review.id)).to.not.be.ok;
      });
    });
    describe('PUT', function () {
      it('api/reviews/:id', async function () {
        const jeff = await User.create({
          email: 'jeff@snacker.com',
          password: 'jeff_pw',
        });

        const cheeto = await Product.create({
          title: 'cheeto',
          brand: 'stay-puft',
          description: 'tasty',
          price: 1.1,
          country: 'usa',
        });

        const tempReview = await Review.writeNew(
          jeff.id,
          cheeto.id,
          3,
          'Decent.',
        );
        const response = await app.put(`/api/reviews/${tempReview.id}`).send({
          rating: 4,
          text: 'Actually, this snack is growing on me',
        });
        const { rating, text } = response.body;
        expect(response.status).to.equal(200);
        expect(rating).to.equal(4);
        expect(text).to.equal('Actually, this snack is growing on me');
      });
    });
  });
});
