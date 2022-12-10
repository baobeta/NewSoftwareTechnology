const request = require('supertest');
const jwt = require('jsonwebtoken');
const { setupDB } = require('../utils/setup');
const _User = require('../../src/v1/models/user.model');
const app = require('../../server');

setupDB();

describe('User controller', () => {
  afterAll(async () => {
  });

  test('create user', async () => {
    jest.setTimeout(3000);
    const u = await _User.create({
      sex: 'male',
      name: 'Le Quoc Bao',
      email: 'lequocbao29072001@gmail.com',
      code: '123456',
    });

    const token = jwt.sign({ email: 'lequocbao29072001@gmail.com' }, '123456', {
      expiresIn: '24h',
    });

    const response = await request(app)
      .get('/v1/user')
      .set('authorization', `Barder ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
