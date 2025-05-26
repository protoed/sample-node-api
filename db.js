/**
 * db.js
 * 
 * Manages SQLite database connections and provides
 * helper functions for adding and retrieving tasks.
 */

const sqlite3 = require('sqlite3').verbose();
const { DB_FILE } = require('./config');

let db;

/**
 * initDb
 * Initializes a connection to the SQLite database
 * and creates the tasks table if it doesn't exist.
 */
function initDb() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DB_FILE, (err) => {
      if (err) return reject(err);

      db.run(
        `CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          description TEXT NOT NULL
        )`,
        (createErr) => {
          if (createErr) return reject(createErr);
          resolve(db);
        }
      );
    });
  });
}

/**
 * addTask
 * Inserts a new task into the tasks table.
 * @param {string} description - The task description.
 * @returns {Promise<number>} The ID of the newly inserted task.
 */
function addTask(description) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO tasks (description) VALUES (?)`;
    db.run(query, [description], function (err) {
      if (err) return reject(err);
      resolve(this.lastID);
    });
  });
}

/**
 * getTasks
 * Retrieves all tasks from the tasks table.
 * @returns {Promise<Array>} An array of task objects.
 */
function getTasks() {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM tasks`;
    db.all(query, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = {
  initDb,
  addTask,
  getTasks
};
