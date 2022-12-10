const request = require('supertest');
const jwt = require('jsonwebtoken');
const { setupDB } = require('../utils/setup');
const _User = require('../../src/v1/models/user.model');
const app = require('../../server');

// const host = 'localhost:8080/';

setupDB();

describe('User controller', () => {
  afterAll(async () => {
  });

  test('get list topic', async () => {
    jest.setTimeout(3000);

    const response = await request(app)
      .get('/v1/topic');
    expect(response.statusCode).toBe(200);
    console.log('🚀 ~ file: topic.test.js:17 ~ test ~ response', response);
  });
});
