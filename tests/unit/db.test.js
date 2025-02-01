/**
 * db.test.js
 *
 * Unit tests for db.js module:
 *  - Verifies addTask and getTasks logic without an actual server context.
 */

const { initDb, addTask, getTasks } = require('../../db');

describe('Database Module Unit Tests', () => {
  beforeAll(async () => {
    // Initialize in-memory DB before tests
    await initDb();
  });

  test('addTask inserts a new task into the DB', async () => {
    const taskId = await addTask('Test Task');
    expect(typeof taskId).toBe('number');
  });

  test('getTasks retrieves all tasks from the DB', async () => {
    const tasks = await getTasks();
    // We expect at least one entry from the previous test
    expect(tasks.length).toBeGreaterThanOrEqual(1);
    expect(tasks[0]).toHaveProperty('description');
  });
});
