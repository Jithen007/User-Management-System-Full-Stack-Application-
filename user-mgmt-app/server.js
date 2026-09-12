// server.js — app entry point. Wires up the API and serves the frontend.
const express = require('express');
const cors = require('cors');
const path = require('path');

const usersRouter = require('./routes/users');
const { router: authRouter } = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// Serve the frontend (public/index.html, style.css, app.js)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`User Management System running at http://localhost:${PORT}`);
});
