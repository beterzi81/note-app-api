const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin', // PostgreSQL kullanıcı adı
  host: 'localhost', // PostgreSQL sunucu adresi
  database: 'db_notes', // Veritabanı adı
  password: 'password', // PostgreSQL şifresi
  port: 5434, // PostgreSQL portu
});

module.exports = pool;
