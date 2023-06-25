import mysql from 'mysql';
import bcrypt from 'bcrypt';

// Rest of the code remains the same


// Create a connection to the database
const connection = mysql.createConnection({
  host: "127.0.0.1", // Database host
  port: 3306, // Database port
  user: "root", // Database username
  password: "bvtpassword", // Database password
  database: "alumniDatabase", // Database name
});

// Establish the connection
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the database!');
});

// Create a table to store user login information
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

connection.query(createUsersTableQuery, (error) => {
  if (error) {
    console.error('Error creating users table:', error);
    return;
  }
  console.log('Users table created!');
});

// Create a table to store additional user information
const createUserInformationTableQuery = `
  CREATE TABLE IF NOT EXISTS user_information (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`;

connection.query(createUserInformationTableQuery, (error) => {
  if (error) {
    console.error('Error creating user_information table:', error);
    return;
  }
  console.log('User information table created!');
});

// Function to register a new user
function registerUser(username, password, fullName, email, phoneNumber) {
  bcrypt.hash(password, 10, (error, hash) => {
    if (error) {
      console.error('Error hashing password:', error);
      return;
    }

    const insertUserQuery = `
      INSERT INTO users (username, password)
      VALUES (?, ?)
    `;

    connection.query(insertUserQuery, [username, hash], (error, result) => {
      if (error) {
        console.error('Error registering user:', error);
        return;
      }

      const userId = result.insertId;

      const insertUserInformationQuery = `
        INSERT INTO user_information (user_id, full_name, email, phone_number)
        VALUES (?, ?, ?, ?)
      `;

      connection.query(insertUserInformationQuery, [userId, fullName, email, phoneNumber], (error) => {
        if (error) {
          console.error('Error storing user information:', error);
          return;
        }
        console.log('User registered successfully!');
      });
    });
  });
}

// Example usage to register a new user with additional information
const username = 'exampleUser';
const password = 'examplePassword';
const fullName = 'John Doe';
const email = 'johndoe@example.com';
const phoneNumber = '1234567890';
registerUser(username, password, fullName, email, phoneNumber);
