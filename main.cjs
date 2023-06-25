// Import necessary libraries
const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "bvtpassword",
  database: "alumniDatabase",
});

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database: ", error);
  } else {
    console.log("Connected to the database.");
  }
});

// Alumni class with their traits
class Alumni {
  constructor(fullName, contactInfo, degree, achievements, projects, skills, recommendations) {
    this.fullName = fullName;
    this.contactInfo = contactInfo;
    this.degree = degree;
    this.achievements = achievements || [];
    this.projects = projects || [];
    this.skills = skills || [];
    this.recommendations = recommendations || [];
  }

  // Save the traits to their respective identities
  saveToDatabase() {
    const query =
      "INSERT INTO alumni (fullName, contactInfo, degree, achievements, projects, skills, recommendations) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      this.fullName,
      this.contactInfo,
      this.degree,
      this.achievements.join(", "),
      this.projects.join(", "),
      this.skills.join(", "),
      this.recommendations.join(", "),
    ];

    connection.query(query, values, (error, result) => {
      if (error) {
        console.error("Error inserting data into the database: ", error);
      } else {
        console.log("Data inserted successfully.");
      }
    });
  }
}

// Create instances of the Alumni class with information
const alumni1 = new Alumni(
  "John Broe",
  "john.broe@aol.com",
  "Bachelor's Degree",
  ["Award of Excellence 2022", "Developed API used by Google"],
  ["Project blah blah filler filler xddxdxxddxd "],
  ["Highly recommendo by teachers and colleagues"]
);

const alumni2 = new Alumni(
  "Jayne Smiff",
  "jayne.smiff@hotmail.com",
  "Master's Degree",
  ["Best Leadership Award 2020", "Developed new OS by herself"],
  ["Project Alpha: Created machine learning model for therapy"],
  ["Ruby, PhP, Communication"],
  ["Strong recommendations from the industry for excellent development skills"]
);
// add information these alumnis PLEASEE PRETTY PLEASEEEEEE
const alumni3 = new Alumni(
  "Jackson Morrow",
  "jacksonmorrow@bvt.com",
  "Bachelor's Degree",
  ["Employee of the Month", "Youngest Senior Dev in Apple"],
  ["Virtual Rubik Cube", "Local cafe website"],
  ["CSS", "Bootstrap"],
  ["Cafe owner", "Virtual Rubik Cube Team Lead"]
);

const alumni4 = new Alumni(
  "Kevin Kittensburgh",
  "kevinK@example.com",
  "Master's Degree",
  ["Fosters puppies", "Employee of the minute"],
  ["Assisted in developing a website for a large tech company", "Developed virtual chess game"],
  ["Python", "C++"],
  ["David", "Mom"]
);

const alumni5 = new Alumni(
  "Micheal Green",
  "forestLover@example.com",
  "Bachelor's Degree",
  ["Won most likely to be a tree hugger in hs", "Is a tree hugger"],
  ["Developed a new slowest sorting algorithm", "Developed new fastest sorting algorithm"],
  ["JavaScript", "HTML"],
  ["Hank Green", "John Green"]
);

const alumni6 = new Alumni(
  "Sunny Charlston",
  "notalwayssunny23@example.com",
  "Master's Degree",
  ["Tutors children in need", "Valedictorian of hs"],
  ["Developed a weather tracker app"],
  ["Rust", "CSS"],
  ["Charity organization leader"]
);

const alumni7 = new Alumni(
  "David Dobrik",
  "loser@example.com",
  "Bachelor's Degree",
  ["Giving away a Tesla", "Gaining 1mil subs"],
  ["Make youtube video", "Make a cult"],
  ["none"],
  ["Youtube", "Tesla"]
);

const alumni8 = new Alumni(
  "Julia Lavender",
  "Julia'sGardens@example.com",
  "Master's Degree",
  ["Starting my own virtual garden website", "Employee of the year"],
  ["Virtual garden", "Website for virtual garden company"],
  ["Wordpress", "Css"],
  ["Digital Skills Prof", "Garden store manager"]
);


// Save alumni data to the database
alumni1.saveToDatabase();
alumni2.saveToDatabase();
alumni3.saveToDatabase();
alumni4.saveToDatabase();
alumni5.saveToDatabase();
alumni6.saveToDatabase();
alumni7.saveToDatabase();
alumni8.saveToDatabase();

// Close the database connection
connection.end();
