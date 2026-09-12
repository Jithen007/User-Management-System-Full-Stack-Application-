const express = require('express');
const db = require('../db');

const router = express.Router();

function toPublic(row) {
  if (!row) return row;

  const { password, ...rest } = row;
  return rest;
}

// CREATE USER
router.post('/', async (req, res) => {
  const { name, email, age, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'name and email are required'
    });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO users (name, email, age, bio) VALUES (?, ?, ?, ?)',
      [name, email, age ?? null, bio ?? null]
    );

    const [rows] = await db.query(
      'SELECT * FROM users WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(toPublic(rows[0]));

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        error: 'A user with that email already exists'
      });
    }

    console.error(err);
    res.status(500).json({
      error: 'Server error creating user'
    });
  }
});

// GET ALL USERS
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM users ORDER BY id DESC'
    );

    res.json(rows.map(toPublic));

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Server error fetching users'
    });
  }
});

// GET ONE USER
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE id = ?',
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    res.json(toPublic(rows[0]));

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Server error fetching user'
    });
  }
});

// UPDATE USER
router.put('/:id', async (req, res) => {
  const { name, email, age, bio } = req.body;

  try {
    const [existingRows] = await db.query(
      'SELECT * FROM users WHERE id = ?',
      [req.params.id]
    );

    if (!existingRows.length) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const existing = existingRows[0];

    await db.query(
      'UPDATE users SET name = ?, email = ?, age = ?, bio = ? WHERE id = ?',
      [
        name ?? existing.name,
        email ?? existing.email,
        age ?? existing.age,
        bio ?? existing.bio,
        req.params.id
      ]
    );

    const [rows] = await db.query(
      'SELECT * FROM users WHERE id = ?',
      [req.params.id]
    );

    res.json(toPublic(rows[0]));

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        error: 'A user with that email already exists'
      });
    }

    console.error(err);
    res.status(500).json({
      error: 'Server error updating user'
    });
  }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM users WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    res.json({
      message: 'User deleted',
      id: Number(req.params.id)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Server error deleting user'
    });
  }
});

module.exports = router;