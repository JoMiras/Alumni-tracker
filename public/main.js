// Import necessary libraries
const mysql = require("mysql");
const bcrypt = require("bcrypt");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "127.0.0.1", // Database host
  port: 3306, // Database port
  user: "root", // Database username
  password: "bvtpassword", // Database password
  database: "alumniDatabase", // Database name
});

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database: ", error); // Log connection error
  } else {
    console.log("Connected to the database."); // Log successful connection
  }
});

// Alumni class with their traits
class Alumni {
  constructor(fullName, contactInfo, degree, achievements, projects, skills, recommendations) {
    this.fullName = fullName; // Full name of the alumni
    this.contactInfo = contactInfo; // Contact information of the alumni
    this.degree = degree; // Degree obtained by the alumni
    this.achievements = achievements || []; // Array of achievements (optional)
    this.projects = projects || []; // Array of projects (optional)
    this.skills = skills || []; // Array of skills (optional)
    this.recommendations = recommendations || []; // Array of recommendations (optional)
  }

  // Save the traits to their respective identities
  saveToDatabase() {
    const query =
      "INSERT INTO alumni (fullName, contactInfo, degree, achievements, projects, skills, recommendations) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      this.fullName,
      this.contactInfo,
      this.degree,
      this.achievements.join(", "), // Convert achievements array to a string
      this.projects.join(", "), // Convert projects array to a string
      this.skills.join(", "), // Convert skills array to a string
      this.recommendations.join(", "), // Convert recommendations array to a string
    ];

    connection.query(query, values, (error, result) => {
      if (error) {
        console.error("Error inserting data into the database: ", error); // Log insert error
      } else {
        console.log("Data inserted successfully."); // Log successful data insertion
      }
    });
  }
}

// User class for login information
class User {
  constructor(username, password) {
    this.username = username; // Username for the user
    this.password = password; // Password for the user
  }

  // Save the user login information to the database
  saveToDatabase() {
    bcrypt.hash(this.password, 10, (error, hashedPassword) => {
      if (error) {
        console.error("Error hashing the password: ", error);
      } else {
        const query = "INSERT INTO users (username, password) VALUES (?, ?)";
        const values = [this.username, hashedPassword];

        connection.query(query, values, (error, result) => {
          if (error) {
            console.error("Error inserting user data into the database: ", error);
          } else {
            console.log("User data inserted successfully.");
          }
        });
      }
    });
  }
}

// Create a table for alumni
const createAlumniTableQuery = `CREATE TABLE IF NOT EXISTS alumni (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(255) NOT NULL,
  contactInfo VARCHAR(255) NOT NULL,
  degree VARCHAR(255) NOT NULL,
  achievements TEXT,
  projects TEXT,
  skills TEXT,
  recommendations TEXT
)`;
connection.query(createAlumniTableQuery, (error) => {
  if (error) {
    console.error("Error creating alumni table: ", error);
  } else {
    console.log("Alumni table created successfully.");
  }
});

// Create a table for user login information
const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
)`;
connection.query(createUsersTableQuery, (error) => {
  if (error) {
    console.error("Error creating users table: ", error);
  } else {
    console.log("Users table created successfully.");
  }
});

// Create instances of the Alumni class with information
const alumni1 = new Alumni(
  "John Broe",
  "john.broe@aol.com",
  "Bachelor's Degree",
  ["Award of Excellence 2022", "Developed API used by Google"], // Array of achievements
  ["Project blah blah filler filler xddxdxxddxd "], // Array of projects
  ["Highly recommendo by teachers and colleagues"] // Array of skills
);

const alumni2 = new Alumni(
  "Jayne Smiff",
  "jayne.smiff@hotmail.com",
  "Master's Degree",
  ["Best Leadership Award 2020", "Developed new OS by herself"], // Array of achievements
  ["Project Alpha: Created machine learning model for therapy"], // Array of projects
  ["Ruby, PhP, Communication"], // Array of skills
  ["Strong recommendations from the industry for excellent development skills"] // Array of recommendations
);

// Create instances of the User class for login information
const user1 = new User("johnbroe", "mysecretpassword");
const user2 = new User("jaynesmiff", "anotherpassword");

// Save alumni information to the database
alumni1.saveToDatabase();
alumni2.saveToDatabase();

// Save user login information to the database
user1.saveToDatabase();
user2.saveToDatabase();

// Retrieve alumni data from the database
Alumni.getAllAlumni((results) => {
  console.log("All Alumni:");
  console.log(results);
});

// Close the database connection when done
connection.end();
