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
describe('Testing for REACT Components and store for Orders and cart', function () {
  describe('Checkcart for items', function () {
    it('loads items in the cart', async function () {
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
    });
  });
});
