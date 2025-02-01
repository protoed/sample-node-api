# Node.js TODO Application

This sample Node.js application demonstrates:
1. Two routes for managing a simple TODO list (in-memory SQLite DB).
2. Unit and integration tests (using Jest).
3. Docker packaging for containerized deployment.
4. Parameter file (`config.js`) for managing the DB connection string.

Below is a suggested file structure along with well-documented code.
.
├─ config.js             # Configuration parameters (DB path, etc.)
├─ db.js                 # Database initialization and access methods
├─ server.js             # Main Express server with routes
├─ routes.js             # Express router defining endpoints
├─ package.json
├─ Dockerfile
└─ tests
   ├─ unit
   │  └─ db.test.js      # Unit tests for DB logic
   └─ integration
      └─ server.test.js  # Integration tests for API routes
