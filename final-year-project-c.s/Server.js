const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const PORT = 7676;
const secretKey = process.env.JWT_SECRET;

// -------------------------------
// Middleware
// -------------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("build"));

// -------------------------------
// MySQL Connection
// -------------------------------
const dbConfig = {
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "train_booking",
};

// Function to create a MySQL connection pool
const dbPool = mysql.createPool(dbConfig);

// -------------------------------
// API Routes
// -------------------------------

// 1. Search Trains
app.post("/api/search-trains", async (req, res) => {
  const { source, destination, date } = req.body;

  if (!source || !destination || !date) {
    return res.status(400).json({ error: "Source, destination, and date are required." });
  }

  try {
    const [results] = await dbPool.query(
      "SELECT train_id, name, source, destination, departure_time AS departure, arrival_time AS arrival, date, price, seats_available AS seatsAvailable, class FROM trains WHERE source = ? AND destination = ? AND date = ?",
      [source, destination, date]
    );
    res.json(results);
  } catch (err) {
    console.error("Error fetching trains:", err);
    res.status(500).json({ error: "Failed to fetch train data." });
  }
});

// 2. Confirm Booking
app.post("/api/confirm-booking", async (req, res) => {
  const { train_id, passenger_name, passenger_age, passenger_phone, passenger_email } = req.body;

  if (!train_id || !passenger_name || !passenger_age || !passenger_phone || !passenger_email) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const [result] = await dbPool.query(
      "INSERT INTO bookings (train_id, passenger_name, passenger_age, passenger_phone, passenger_email, booked_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [train_id, passenger_name, passenger_age, passenger_phone, passenger_email]
    );

    const [trainDetails] = await dbPool.query(
      "SELECT name, source, destination, departure_time, arrival_time, date FROM trains WHERE train_id = ?",
      [train_id]
    );

    if (trainDetails.length === 0) {
      return res.status(404).json({ error: "Train not found." });
    }

    res.json({ message: "Booking confirmed!", bookingId: result.insertId, trainDetails: trainDetails[0] });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ error: "Failed to confirm booking." });
  }
});

// Middleware for JWT Authentication
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  jwt.verify(token, secretKey, (err, admin) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.admin = admin;
    next();
  });
}

// Admin Login: Authenticate and generate a JWT token
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [admin] = await dbPool.query("SELECT * FROM Admins WHERE username = ?", [username]);

    if (admin.length === 0) {
      return res.status(404).json({ message: "Admin not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, admin[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: admin[0].id }, secretKey, { expiresIn: "1h" });
    res.json({ message: "Login successful.", token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Login failed." });
  }
});

// Add Train
app.post("/api/admin/add-train", authenticateToken, async (req, res) => {
  const { name, source, destination, departure, arrival, price, seatsAvailable } = req.body;

  try {
    const [result] = await dbPool.query(
      "INSERT INTO trains (name, source, destination, departure_time, arrival_time, price, seats_available) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, source, destination, departure, arrival, price, seatsAvailable]
    );
    res.status(201).json({ message: "Train added successfully.", trainId: result.insertId });
  } catch (err) {
    console.error("Error adding train:", err);
    res.status(500).json({ error: "Failed to add train." });
  }
});

// Get All Trains
app.get("/api/admin/trains", authenticateToken, async (req, res) => {
  try {
    const [trains] = await dbPool.query("SELECT * FROM trains");
    res.json(trains);
  } catch (err) {
    console.error("Error fetching trains:", err);
    res.status(500).json({ error: "Failed to fetch trains." });
  }
});

// Delete Train
app.delete("/api/admin/delete-train/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await dbPool.query("DELETE FROM trains WHERE train_id = ?", [id]);
    res.json({ message: "Train deleted successfully." });
  } catch (err) {
    console.error("Error deleting train:", err);
    res.status(500).json({ error: "Failed to delete train." });
  }
});

// Get all passengers (bookings)
app.get("/api/admin/passengers", authenticateToken, async (req, res) => {
  try {
      const connection = await dbPool();
      const [passengers] = await connection.execute(
          "SELECT * FROM Bookings"
      );
      connection.end();
      res.status(200).json(passengers);
  } catch (err) {
      console.error("Error fetching passengers:", err);
      res.status(500).json({ message: "Error retrieving passenger data" });
  }
});

// Update passenger details by booking ID
app.put("/api/admin/passenger/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { passenger_name, passenger_age, passenger_phone, passenger_email } = req.body;

  try {
      const connection = await dbPool();
      const [result] = await connection.execute(
          "UPDATE Bookings SET passenger_name = ?, passenger_age = ?, passenger_phone = ?, passenger_email = ? WHERE booking_id = ?",
          [passenger_name, passenger_age, passenger_phone, passenger_email, id]
      );
      connection.end();

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Passenger not found" });
      }

      res.status(200).json({ message: "Passenger data updated successfully" });
  } catch (err) {
      console.error("Error updating passenger data:", err);
      res.status(500).json({ message: "Error updating passenger data" });
  }
});

// Delete passenger data by booking ID
app.delete("/api/admin/passenger/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
      const connection = await dbPool();
      const [result] = await connection.execute(
          "DELETE FROM Bookings WHERE booking_id = ?",
          [id]
      );
      connection.end();

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Passenger not found" });
      }

      res.status(200).json({ message: "Passenger deleted successfully" });
  } catch (err) {
      console.error("Error deleting passenger data:", err);
      res.status(500).json({ message: "Error deleting passenger data" });
  }
});


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
