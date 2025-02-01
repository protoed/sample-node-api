/**
 * routes.js
 *
 * Defines two Express routes:
 * 1. POST /tasks: Add a new task.
 * 2. GET /tasks:  Get all tasks.
 */

const express = require('express');
const router = express.Router();
const { addTask, getTasks } = require('./db');

/**
 * POST /tasks
 * Body Parameters:
 *  - description (string): The task description to be added.
 * Response: JSON object with the inserted task's ID.
 */
router.post('/tasks', async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res
        .status(400)
        .json({ error: 'Task description is required.' });
    }

    const newTaskId = await addTask(description);
    res.status(201).json({ taskId: newTaskId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /tasks
 * Response: JSON array of task objects.
 */
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
