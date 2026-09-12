// routes/auth.js
// Optional login authentication using bcrypt and JWT

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// JWT secret for local practice
const JWT_SECRET = 'dev-secret-change-me';


// =========================
// REGISTER
// =========================
router.post('/register', async (req, res) => {
  const { name, email, password, age, bio } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'name, email and password are required'
    });
  }

  try {
    // Check whether email already exists
    const [existingRows] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingRows.length > 0) {
      return res.status(409).json({
        error: 'A user with that email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await db.query(
      `INSERT INTO users
       (name, email, age, bio, password)
       VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        email,
        age ?? null,
        bio ?? null,
        hashedPassword
      ]
    );

    // Create JWT token
    const token = jwt.sign(
      {
        id: result.insertId,
        email: email
      },
      JWT_SECRET,
      {
        expiresIn: '2h'
      }
    );

    res.status(201).json({
      token: token,
      id: result.insertId,
      name: name,
      email: email
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: 'Server error during registration'
    });
  }
});


// =========================
// LOGIN
// =========================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'email and password are required'
    });
  }

  try {
    // Find user by email
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = rows[0];

    if (!user || !user.password) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    // Check password
    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      JWT_SECRET,
      {
        expiresIn: '2h'
      }
    );

    res.json({
      token: token,
      id: user.id,
      name: user.name,
      email: user.email
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: 'Server error during login'
    });
  }
});


// =========================
// AUTHENTICATION MIDDLEWARE
// =========================
function requireAuth(req, res, next) {

  const header = req.headers.authorization || '';

  const token = header.startsWith('Bearer ')
    ? header.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      error: 'Missing token'
    });
  }

  try {

    req.user = jwt.verify(
      token,
      JWT_SECRET
    );

    next();

  } catch (err) {

    res.status(401).json({
      error: 'Invalid or expired token'
    });
  }
}


// =========================
// EXPORT
// =========================
module.exports = {
  router,
  requireAuth
};