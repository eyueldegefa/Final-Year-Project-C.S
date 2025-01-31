require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 7676;
const secretKey = process.env.JWT_SECRET;

// Middleware
app.use(
  cors({
      origin: "http://localhost:7676", 
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.static("build"));

// MySQL Connection
const dbConfig = {
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "train_booking",
};
const dbPool = mysql.createPool(dbConfig);

// Admin Authentication Middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log("Authorization Header:", authHeader);

//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) {
//       return res.status(401).json({ message: "Access Denied: No Token Provided" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//           return res.status(403).json({ message: "Invalid Token" });
//       }

//       console.log("Decoded Token:", decoded); // Log to check its structure
//       req.user = decoded;

//       if (!req.user.role) { // Check if 'role' exists
//           return res.status(403).json({ message: "Invalid Token: Role missing" });
//       }

//       next();
//   });
// };

// ------------------------------------------------------------------------------------------
// Fetch All Passengers (Admin)
app.get("/api/admin/passengers", async (req, res) => {
  try {
      const [passengers] = await dbPool.query("SELECT * FROM bookings");
      res.json(passengers);
  } catch (err) {
      console.error("Error fetching passengers:", err);
      res.status(500).json({ error: "Failed to fetch passengers." });
  }
});

// Update a passenger
app.put("/api/admin/update-passenger/:id", async (req, res) => {
  const { id } = req.params;
  const { passenger_name, passenger_age, passenger_phone, passenger_email } = req.body;

  try {
      const [result] = await dbPool.query(
          `UPDATE bookings 
           SET passenger_name = ?, passenger_age = ?, passenger_phone = ?, passenger_email = ? 
           WHERE id = ?`,
          [passenger_name, passenger_age, passenger_phone, passenger_email, id]
      );

      if (result.affectedRows > 0) {
          res.json({ message: "Passenger updated successfully!" });
      } else {
          res.status(404).json({ error: "Passenger not found" });
      }
  } catch (err) {
      console.error("Error updating passenger:", err);
      res.status(500).json({ error: "Failed to update passenger" });
  }
});


// Delete a passenger
app.delete("/api/admin/delete-passenger/:id", async (req, res) => {
  const { id } = req.params;

  try {
      const [result] = await dbPool.query("DELETE FROM bookings WHERE id = ?", [id]);

      if (result.affectedRows > 0) {
          res.json({ message: "Passenger deleted successfully!" });
      } else {
          res.status(404).json({ error: "Passenger not found" });
      }
  } catch (err) {
      console.error("Error deleting passenger:", err);
      res.status(500).json({ error: "Failed to delete passenger" });
  }
});


// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Fetch All Trains (Admin)
app.get("/api/admin/trains", async (req, res) => {
  try {
      const trains = await dbPool.query("SELECT * FROM trains");
      res.json(trains);
  } catch (error) {
      console.error("Error fetching trains:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete train by ID
app.delete('/api/admin/delete-train/:id', async (req, res) => {
  const { id } = req.params;
  try {
      await dbPool.query("DELETE FROM trains WHERE train_id = ?", [id]);
      res.json({ message: "Train deleted successfully!" });
  } catch (error) {
      console.error("Error deleting train:", error);
      res.status(500).json({ error: "Failed to delete train" });
  }
});

// Update train details
app.put('/api/admin/update-train/:id', async (req, res) => {
  const { id } = req.params;
  const { name, source, destination, departure_time, arrival_time, price, seats_available } = req.body;

  try {
      await dbPool.query(`
          UPDATE trains 
          SET name = ?, source = ?, destination = ?, departure_time = ?, arrival_time = ?, price = ?, seats_available = ?
          WHERE train_id = ?`,
          [name, source, destination, departure_time, arrival_time, price, seats_available, id]
      );

      res.json({ message: "Train updated successfully!" });
  } catch (error) {
      console.error("Error updating train:", error);
      res.status(500).json({ error: "Failed to update train" });
  }
});

// Add New Train
app.post("/api/admin/add-train", async (req, res) => {
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


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
