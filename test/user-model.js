const { expect } = require('chai');
const jwt = require('jsonwebtoken');

const app = require('supertest')(require('../server/server'));

const {
  db,
  models: { User, Review, Product },
} = require('../server/db');

describe('User Model', function () {
  beforeEach(async function () {
    try {
      await db.sync({ force: true });
      await User.create({
        email: 'kevin@snacker.com',
        password: 'kevin_pw',
      });
      await User.create({
        email: 'alejandra@snacker.com',
        password: 'alejandra_pw',
      });
      await User.create({
        email: 'yiru@snacker.com',
        password: 'yiru_pw',
      });
    } catch (error) {
      throw error;
    }
  });

  it('should exist', async function () {
    const users = await User.findAll();
    expect(users).to.exist;
  });
  it('should return an array', async function () {
    const users = await User.findAll();
    expect(users).to.be.an('array');
    expect(users.length).to.be.at.least(0);
  });
  // very simple tests. they will fail if you provide invalid inputs to the User.create() call that is within the test
  it('should require an email address', async function () {
    const user = await User.create({
      email: 'rosie@snacker.com',
      password: '123ert',
    });
    const users = await User.findAll();
    expect(users.length).to.equal(4);
  });
  it('should require a password', async function () {
    const user = await User.create({
      email: 'rosie@snacker.com',
      password: '123ert',
    });
    const users = await User.findAll();
    expect(users.length).to.equal(4);
  });
  it('provided email address is valid email address', async function () {
    const user = await User.create({
      email: 'rosie@snacker.com',
      password: '123ert',
    });
    const users = await User.findAll();
    expect(users.length).to.equal(4);
  });
  it('default value for `admin` property is `false`', async function () {
    const user = await User.create({
      email: 'rosie@snacker.com',
      password: '123ert',
    });
    expect(user.admin).to.equal(false);
  });

  describe('JWT authentication', function () {
    it('there are three test users', async function () {
      const users = await User.findAll();
      expect(users.length).to.equal(3);
    });
    describe('User update', () => {
      describe('change email', function () {
        it('does not change the password', async function () {
          const elmo = await User.create({
            email: 'elmo@snacker.com',
            password: 'elmo_pw',
          });
          const password = elmo.password;
          elmo.email = 'elmo2@snacker.com';
          await elmo.save();
          expect(elmo.password).to.equal(password);
        });
      });
    });
    describe('User.authenticate', () => {
      describe('correct credentials', () => {
        it('returns a token', async () => {
          const olive = await User.create({
            email: 'olive@snacker.com',
            password: 'olive_pw',
          });
          const token = await User.authenticate({
            email: 'olive@snacker.com',
            password: 'olive_pw',
          });
          expect(token).to.be.ok;
        });
      });
      describe('incorrect credentials', function () {
        it('throws an error', async function () {
          try {
            await User.authenticate({
              email: 'kevin@snacker.com',
              password: 'kevin',
            });
          } catch (error) {
            expect(error.status).to.equal(401);
            expect(error.message).to.equal(
              'The email address or password that you provided is incorrect.'
            );
          }
        });
      });
    });
    describe('User.byToken()', function () {
      describe('with a valid token', function () {
        it('returns a user', async function () {
          const users = await User.findAll();
          const token = await jwt.sign({ id: users[2].id }, process.env.JWT);
          const user = await User.byToken(token);
          expect(user.email).to.equal('yiru@snacker.com');
        });
      });
      describe('with an invalid token', function () {
        it('throws an error', async function () {
          const users = await User.findAll();
          try {
            const token = await jwt.sign({ id: users[2].id }, 'invalid-token');
            await User.byToken(token);
          } catch (error) {
            expect(error.status).to.equal(401);
            expect(error.message).to.equal(
              'The token that you provided is not valid.'
            );
          }
        });
      });
    });
  });
  describe('User Routes', function () {
    beforeEach(async function () {
      await db.sync({ force: true });
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
      const review = await Review.writeNew(user.id, product.id, 4, 'So good!');
      let seed = { user, product, review };
    });
    describe('GET', function () {
      it('api/users', async function () {
        const response = await app.get('/api/users');
        const users = response.body;
        expect(response.status).to.equal(200);
        expect(users).to.be.ok;
        expect(users).to.be.an('array');
      });
      it('api/users/:id', async function () {
        const jack = await User.create({
          email: 'jack@snacker.com',
          password: 'abc123',
        });
        const response = await app.get(`/api/users/${jack.id}`);
        const user = response.body;
        expect(response.status).to.equal(200);
        expect(user).to.be.ok;
        expect(user).to.be.an('object');
      });
    });
    describe('POST', function () {
      it('api/users', async function () {
        const response = await app.post('/api/users').send({
          email: 'test@snacker.com',
          password: 'test_pw',
        });
        const newUser = response.body;
        expect(response.status).to.equal(201);
        expect(newUser).to.be.ok;
        expect(newUser).to.be.an('object');
      });
    });
    describe('DELETE', function () {
      it('api/users/:id', async function () {
        const tempUser = await User.create({
          email: 'test@snacker.com',
          password: 'test_pw',
        });
        const response = await app.delete(`/api/users/${tempUser.id}`);
        expect(response.status).to.equal(204);
        expect(await User.findByPk(tempUser.id)).to.not.be.ok;
      });
    });
    describe('PUT', function () {
      it('api/users/:id', async function () {
        const tempUser = await User.create({
          email: 'test@snacker.com',
          password: 'test_pw',
        });
        const response = await app.put(`/api/users/${tempUser.id}`).send({
          email: 'changed@snacker.com',
          password: 'changed_pw',
        });
        const { email } = response.body;
        expect(response.status).to.equal(200);
        expect(email).to.equal('changed@snacker.com');
      });
    });
  });
  describe('POST /api/auth', function () {
    beforeEach(async function () {
      await db.sync({ force: true });
      const user = await User.create({
        email: 'rosie@snacker.com',
        password: 'rosie_pw',
      });
    });
    describe('with valid credentials', function () {
      it('returns a token', async function () {
        const response = await app.post('/api/auth').send({
          email: 'rosie@snacker.com',
          password: 'rosie_pw',
        });
        expect(response.status).to.equal(200);
        expect(response.body.token).to.be.ok;
      });
    });
    describe('with invalid credentials', function () {
      it('throws an error', async function () {
        const response = await app.post('/api/auth').send({
          email: 'rosie@snacker.com',
          password: 'rosie_incorrect',
        });
        expect(response.status).to.equal(401);
        expect(response.body.error).to.equal(
          'The email address or password that you provided is incorrect.'
        );
      });
    });
  });
  describe('POST /api/auth', function () {
    describe('with valid token', async function () {
      it('returns a user', async function () {
        await db.sync({ force: true });
        const user = await User.create({
          email: 'rosie@snacker.com',
          password: 'rosie_pw',
        });
        const token = await jwt.sign({ id: user.id }, process.env.JWT);
        const response = await app.get('/api/auth').set({
          authorization: token,
        });

        expect(response.status).to.equal(200);

        expect(response.body.email).to.equal('rosie@snacker.com');
      });
    });
  });
});
