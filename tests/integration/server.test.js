/**
 * server.test.js
 *
 * Integration tests for the Express server:
 *  - Checks whether endpoints work as expected end-to-end.
 */

const request = require('supertest');
const app = require('../../server');

describe('Server Integration Tests', () => {
  test('POST /api/tasks should add a new task and return its ID', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ description: 'Integration Task' })
      .expect(201);

    expect(response.body).toHaveProperty('taskId');
  });

  test('GET /api/tasks should return a list of tasks', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0]).toHaveProperty('description');
  });
});
