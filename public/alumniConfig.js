const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "bvtpassword",
  database: "alumniDatabase",
});

async function connectDataBase(req, _, next) {
  try {
    req.db = await connection.getConnection();
    req.db.connection.config.namedPlaceholders = true;

    await req.db.query(`SET SESSION sql_mode = "TRADITIONAL"`);
    await req.db.query(`SET time_zone = '-8:00'`);

    await next();

    req.db.release();
  } catch (err) {
    console.log(`Error in connectDatabase`, err);

    if (req.db) req.db.release();
    throw err;
  }
}

module.exports = connectDataBase;
