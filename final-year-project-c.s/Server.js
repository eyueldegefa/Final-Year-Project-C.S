const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
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
app.get("/api/search-trains", (req, res) => {
  const { source, destination, travel_date, passengerNumber, class: travelClass } = req.body;

  // Validate input fields
  if (!source || !destination || !travel_date || !passengerNumber || !travelClass) {
    return res.status(400).json({ error: "Missing required search fields." });
  }

  // Query to search for available trains
  const query = `
    SELECT 
      train_id, name, source, destination, departure_time, arrival_time, seats_available, price
    FROM 
      trains
    WHERE 
      source = ? AND 
      destination = ? AND 
      seats_available >= ? AND 
      travel_date = ?
  `;

  db.query(query, [source, destination, passengerNumber, travel_date], (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).json({ error: "An error occurred while retrieving trains." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No trains found for the given criteria." });
    }
    console.log("Executing query:", query, [source, destination, passengerNumber, travel_date]);
    res.json(results);
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
