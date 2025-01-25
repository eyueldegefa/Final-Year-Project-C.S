const express = require("express"); 
const cors = require("cors");
const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For token-based authentication
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const PORT = 7676;
const secretKey = "yourSecretKey"; // Replace with a secure key for JWT signing
// -------------------------------
// Middleware
// -------------------------------
app.use(cors());
app.use(bodyParser.json());  // Middleware to parse JSON requests
app.use(express.static("build")); // Serve static files from the "build" folder

// -------------------------------
// MySQL Connection
// -------------------------------
const dbConfig = {
  host: "localhost",
  user: "root", // MySQL username
  password: process.env.DB_PASSWORD, // Password from .env
  database: "train_booking", // Database name
};

// Function to create a MySQL connection
async function createDbConnection() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

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
    const connection = await createDbConnection();
    const [results] = await connection.execute(
      "SELECT train_id, name, source, destination, departure_time AS departure, arrival_time AS arrival, date, price, seats_available AS seatsAvailable, class FROM trains WHERE source = ? AND destination = ? AND date = ?",
      [source, destination, date]
    );
    connection.end();
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
    const connection = await createDbConnection();

    // Insert booking into the database
    const [result] = await connection.execute(
      "INSERT INTO bookings (train_id, passenger_name, passenger_age, passenger_phone, passenger_email, booked_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [train_id, passenger_name, passenger_age, passenger_phone, passenger_email]
    );

    // Fetch train details
    const [trainDetails] = await connection.execute(
      "SELECT name, source, destination, departure_time, arrival_time, date FROM trains WHERE train_id = ?",
      [train_id]
    );

    connection.end();

    if (trainDetails.length === 0) {
      return res.status(404).json({ error: "Train not found." });
    }

    res.json({ message: "Booking confirmed!", bookingId: result.insertId, trainDetails: trainDetails[0] });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ error: "Failed to confirm booking." });
  }
});

// -----------------------------------------------------------------------

// Middleware to authenticate JWT tokens
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Retrieve token from Authorization header
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
      return res.status(401).json({ message: "Access denied" });
  }

  // Verify token
  jwt.verify(token, secretKey, (err, admin) => {
      if (err) {
          return res.status(403).json({ message: "Invalid token" });
      }
      req.admin = admin; // Attach admin info to request
      next();
  });
}

// ----------------------------------------------------------------------------

// Admin Login: Authenticate admin and generate a JWT token
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body

  try {
      // Check if admin exists in the database
      const [admin] = await dbConfig.query("SELECT * FROM Admins WHERE username = ?", [username]);

      if (admin.length === 0) {
          return res.status(404).json({ message: "Admin not found" });
      }

      // Verify the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, admin[0].password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate a JWT token for authentication
      const token = jwt.sign({ id: admin[0].id }, secretKey, { expiresIn: "1h" });
      res.status(200).json({ message: "Login successful", token });
  } catch (err) {
      res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

// -----------------------------------------------------

// Add a train to the database
app.post("/api/admin/add-train", authenticateToken, async (req, res) => {
  const { name, source, destination, departure, arrival, price, seatsAvailable } = req.body;

  try {
      // Insert train details into the database
      const result = await dbConfig.query(
          "INSERT INTO Trains (name, source, destination, departure, arrival, price, seatsAvailable) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, source, destination, departure, arrival, price, seatsAvailable]
      );
      res.status(201).json({ message: "Train added successfully", trainId: result[0].insertId });
  } catch (err) {
      res.status(500).json({ message: "Error adding train", error: err.message });
  }
});

// ------------------------------------------------------------------------------

// Get all trains
app.get("/api/admin/trains", authenticateToken, async (req, res) => {
  try {
      const [trains] = await dbConfig.query("SELECT * FROM Trains");
      res.status(200).json(trains);
  } catch (err) {
      res.status(500).json({ message: "Error retrieving trains", error: err.message });
  }
});

// ------------------------------------------------------------------------------------

// Delete a train from the database
app.delete("/api/admin/delete-train/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
      // Delete train by ID
      await dbConfig.query("DELETE FROM Trains WHERE id = ?", [id]);
      res.status(200).json({ message: "Train deleted successfully" });
  } catch (err) {
      res.status(500).json({ message: "Error deleting train", error: err.message });
  }
});



// -------------------------------
// Error Handling Middleware
// -------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// -------------------------------
// Start Server
// -------------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
