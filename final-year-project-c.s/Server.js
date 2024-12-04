const express = require("express");
const mysql = require("mysql2");
require('dotenv').config();

const app = express();
const PORT = 7676;

// Serve static files from the "public" folder
app.use(express.static("build"));

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",           // our MySQL username
  password: process.env.DB_PASSWORD,   // This should match the variable in .env
  database: "train_booking", // our database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// API Route: Fetch all train data
app.get("/api/trains", (req, res) => {
  const query = "SELECT * FROM trains"; // Replace with your table name

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching train data:", err);
      res.status(500).json({ error: "Failed to fetch train data" });
      return;
    }
    res.json(results); // Send train data as JSON
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
