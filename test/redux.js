// Assertions
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {
  LOAD_USERS,
  loadUsers,
  loadUsersActionCreator,
  CREATE_USER,
  createUserActionCreator,
} from '../client/store/usersStore';
import { reducer } from '../client/store';

const chai = require('chai');

const { expect } = chai;
const chaiThings = require('chai-things');

chai.use(chaiThings);

const agent = require('supertest')(app);
const app = require('../server/server');
const { db } = require('../server/db');
const User = require('../server/db/models/User');

enzyme.configure({ adapter: new Adapter() });

//  Redux
describe('Users in Redux Store', function () {
  describe('loadUsersActionCreator', function () {
    it('creates an object with `type` and `users`', async function () {
      await db.sync({ force: true });
      await Promise.all([
        User.create({
          email: 'kevin@snacker.com',
          password: 'kevin_pw',
        }),
        await User.create({
          email: 'alejandra@snacker.com',
          password: 'alejandra_pw',
        }),
        await User.create({
          email: 'ding@snacker.com',
          password: 'ding_pw',
        }),
      ]);

      const users = await User.findAll();

      const loadUsersAction = loadUsersActionCreator(users);
      expect(loadUsersAction.type).to.equal(LOAD_USERS);
      expect(Array.isArray(loadUsersAction.users)).to.be.true;
      expect(loadUsersAction.users[2].email).to.equal('ding@snacker.com');
    });
  });
  describe('createUserActionCreator', function () {
    it('creates an object with `type` and `user`', async function () {
      await db.sync({ force: true });
      const user = await User.create({
        email: 'russel@snacker.com',
        password: 'russel_pw',
        firstName: 'Russel',
        lastName: 'McMillan',
      });

      const createUserAction = createUserActionCreator(user);
      expect(createUserAction.type).to.equal(CREATE_USER);
      expect(createUserAction.user).to.be.an('object');
      expect(createUserAction.user.email).to.equal('russel@snacker.com');
    });
  });
  describe('Users Reducer', function () {
    it('returns a new state with the updated `users`', async function () {
      await db.sync({ force: true });
      await Promise.all([
        User.create({
          email: 'kevin@snacker.com',
          password: 'kevin_pw',
        }),
        await User.create({
          email: 'alejandra@snacker.com',
          password: 'alejandra_pw',
        }),
        await User.create({
          email: 'ding@snacker.com',
          password: 'ding_pw',
        }),
      ]);
      const users = await User.findAll();

      const initialState = {
        users: [],
      };

      const newState = reducer(initialState, {
        type: LOAD_USERS,
        users,
      });
      // this should have changed :
      expect(newState.users).to.deep.equal(users);
    });

    it('does not modify the previous state', async function () {
      await db.sync({ force: true });
      await Promise.all([
        User.create({
          email: 'kevin@snacker.com',
          password: 'kevin_pw',
        }),
        await User.create({
          email: 'alejandra@snacker.com',
          password: 'alejandra_pw',
        }),
        await User.create({
          email: 'ding@snacker.com',
          password: 'ding_pw',
        }),
      ]);
      const users = await User.findAll();

      const initialState = {
        users: [],
      };

      const newState = reducer(initialState, {
        type: LOAD_USERS,
        users,
      });

      expect(initialState).to.deep.equal({
        users: [],
      });
    });
  });
});
