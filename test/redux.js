//Assertions
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {
  LOAD_USERS,
  loadUsers,
  loadUsersActionCreator,
} from '../client/store/usersStore';
import { reducer } from '../client/store';

const chai = require('chai');
const { expect } = chai;
const chaiThings = require('chai-things');
chai.use(chaiThings);

const app = require('../server/server');
const agent = require('supertest')(app);
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
  describe('Users Reducer', function () {
    it('returns a new state with the updated `companies`', async function () {
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
      // this should have changed:
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
