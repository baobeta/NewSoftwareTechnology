const mongoose = require('mongoose');
const { setupDB } = require('../utils/setup');
const _Role = require('../../src/v1/models/role.model');
const {
  create, getPermissions, sync, list, findOne,
} = require('../../src/v1/services/role.service');

const { ObjectId } = mongoose.Types;

setupDB();
describe('role service', () => {
  test('create role', async () => {
    jest.setTimeout(30000);
    const role = await create('ADMIN', 'toan quyen');
    const check = await _Role.find({});
    expect(role._id.toString()).toBe(check[0]._id.toString());
  });

  test('check list role', async () => {
    jest.setTimeout(30000);
    await create('ADMIN', 'toan quyen');
    await create('TEACHER', 'tao mon dk');
    await create('STUDENT', 'dang ki');
    const roles = await list();
    expect(roles.length).toBe(3);
  });
});
