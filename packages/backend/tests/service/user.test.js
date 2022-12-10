/* eslint-disable max-len */
const mongoose = require('mongoose');
const { setupDB } = require('../utils/setup');
const {
  insert, remove, list, update,
} = require('../../src/v1/services/user.service');
const _User = require('../../src/v1/models/user.model');

const { ObjectId } = mongoose.Types;

setupDB();
describe('user service', () => {
  test('insert user', async () => {
    jest.setTimeout(30000);
    const id = await ObjectId();
    const user = await insert('name test', 'lequocbao29072001@gmail.com', '19110', 'male', id, 'link_pic');
    const check = await _User.findOne({ email: 'lequocbao29072001@gmail.com' });
    expect(user._id.toString()).toBe(check._id.toString());
  });

  test('update user', async () => {
    const id = await ObjectId();
    const user = await insert('name test', 'lequocbao29072001@gmail.com', '19110', 'male', id, 'link_pic');
    await update(user._id, 'name test', 'lequocbao29072001@gmail.com', '19110test', 'male', id, 'link_pic');
    const check = await _User.findOne({ _id: user._id });
    expect(check.code.toString()).toBe('19110test');
  });

  test('delete user', async () => {
    jest.setTimeout(30000);
    const user = await _User.create({
      firstName: 'aaa',
      lastName: 'bbb',
      sex: 'male',
      email: 'lequocbao29072001@gmail.com',
    });
    await remove(user._id);
    const check = await _User.findOne({ email: 'lequocbao29072001@gmail.com' });
    expect(check).toBeNull();
  });

  test('list user', async () => {
    jest.setTimeout(30000);
    await _User.create({
      firstName: 'aaa',
      lastName: 'bbb',
      sex: 'male',
      email: `${ObjectId()}@gmail.com`,
    });
    await _User.create({
      firstName: 'aaa',
      lastName: 'bbb',
      sex: 'male',
      email: `${ObjectId()}@gmail.com`,
    });
    await _User.create({
      firstName: 'aaa',
      lastName: 'bbb',
      sex: 'male',
      email: `${ObjectId()}@gmail.com`,
    });
    const users = await list();
    expect(users.length).toBe(3);
  });
});
