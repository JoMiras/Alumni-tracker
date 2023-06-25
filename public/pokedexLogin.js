import mysql from 'mysql';
import bcrypt from 'bcrypt';

// Create a connection to the database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "bvtpassword",
  database: "pokemonDB",
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

// Create the users table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )
`;

connection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating table:', err);
    return;
  }
  console.log('Table created successfully!');
});

// Function to register a new user
function registerUser(username, password) {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return;
    }

    const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const values = [username, hash];

    connection.query(insertUserQuery, values, (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        return;
      }
      console.log('User registered successfully!');
    });
  });
}

// Usage example:
registerUser('john', 'secretPassword');
