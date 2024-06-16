const request = require('supertest');
const { app, server } = require('../index');
const db = require('../config/db');

beforeAll(async () => {
  // Set up the test database
  await db.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
});

afterAll(async () => {
  // Clean up the test database
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.end();
});

describe('Auth Endpoints', () => {
  let token;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token; // Save the token for subsequent tests
  });

  it('should retrieve the logged-in user\'s profile', async () => {
    const res = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'testuser');
    expect(res.body).toHaveProperty('email', 'testuser@example.com');
  });
});
