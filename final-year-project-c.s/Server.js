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
app.get("/trains", (req, res) => {
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

// API Endpoint: Search Trains
app.get("/search-trains", (req, res) => {
  const { source, destination, date, travelClass, passengerCount } = req.query;

  // Validate required fields
  if (!source || !destination || !date || !travelClass || !passengerCount) {
    return res.status(400).json({ error: "Missing required search fields." });
  }

  // SQL Query
  const query = `
    SELECT * 
    FROM trains
    WHERE source = ?
      AND destination = ?
      AND travel_date = ?
      AND class = ?
      AND seats_available >= ?
  `;

  // Query Parameters
  const values = [source, destination, date, travelClass, passengerCount];

  // Execute Query
  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({
        error: "An error occurred while searching for trains.",
        details: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No trains found for the specified criteria." });
    }

    res.json(results);
  });
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
