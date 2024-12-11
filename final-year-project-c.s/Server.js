const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 7878;

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
app.get("/trains", (req, res) => {
  const query = "SELECT * FROM trains"; 
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching train data:", err);
      res.status(500).json({ error: "Failed to fetch train data" });
      return;
    }
    res.json(results); // Send train data as JSON
  });
});

// API Endpoint: Search Trains
app.post("/api/search-trains", (req, res) => {
  const { source, destination, date } = req.body;

  // Validate input
  if (!source || !destination || !date) {
    return res.status(400).json({ error: "Source, destination, and date are required." });
  }

  // Query
  const query = "SELECT * FROM trains WHERE source = ? AND destination = ? AND date = ?";
  db.query(query, [source, destination, date], (err, results) => {
    if (err) {
      console.error("Error fetching trains:", err);
      return res.status(500).json({ error: "Failed to fetch train data." });
    }
    res.json(results); // Return the train data
  });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
