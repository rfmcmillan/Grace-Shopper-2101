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

describe('loadUsersActionCreator', function () {
  it('returns a JavaScript Object', async function () {
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

    const users = await User.findAll();

    const loadUsersAction = loadUsersActionCreator(users);
    expect(typeof loadUsersAction).to.equal('object');
    expect(Object.getPrototypeOf(loadUsersAction)).to.equal(Object.prototype);
  });
});
