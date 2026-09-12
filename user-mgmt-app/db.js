// db.js
require('dotenv').config();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DBHOST || 'localhost',
  port: process.env.DBPORT || 3306,
  database: process.env.DBNAME || 'user_directory',
  user: process.env.DBUSER || 'root',
  password: process.env.DBPASSWORD
});

pool.getConnection()
  .then((connection) => {
    console.log('✅ Connected to MySQL');
    connection.release();
  })
  .catch((err) => {
    console.error('❌ MySQL connection failed:', err.message);
  });

module.exports = pool;