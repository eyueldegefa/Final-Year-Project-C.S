require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cron = require("node-cron");
const chapa = require("chapa")("your-chapa-secret-key"); // Ensure you have the correct Chapa secret key

const app = express();
const PORT = 7676;

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

// Cron Job to Expire Unpaid Bookings
cron.schedule("*/5 * * * *", async () => {
  try {
    const connection = await dbPool.getConnection();
    await connection.execute(
      "UPDATE bookings SET payment_status = 'expired' WHERE payment_status = 'pending' AND expires_at < NOW()"
    );
    connection.release();
  } catch (error) {
    console.error("Cron job error:", error);
  }
});

// ------------------------------------------------------------------------------------------
// Search Trains
app.post("/api/search-trains", async (req, res) => {
  const { source, destination, date } = req.body;

  try {
    const connection = await dbPool.getConnection();
    const [rows] = await connection.execute(
      "SELECT train_id, name, source, destination, departure_time, arrival_time, date, price, seats_available, class FROM trains WHERE source = ? AND destination = ? AND date = ?",
      [source, destination, date]
    );
    connection.release();

    res.json(rows);
  } catch (error) {
    console.error("Error fetching trains:", error);
    res.status(500).json({ error: "Failed to fetch train data." });
  }
});

// Fetch Seats for a Specific Train
app.get("/seats/:trainId", async (req, res) => {
  const trainId = req.params.trainId;

  try {
    const connection = await dbPool.getConnection();
    const [rows] = await connection.query("SELECT * FROM seats WHERE train_id = ?", [trainId]);
    connection.release();

    res.json(rows);
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).json({ error: "Failed to fetch seat data." });
  }
});

// Confirm Booking
app.post("/api/confirm-booking", async (req, res) => {
  const { train_id, passenger_name, passenger_age, passenger_phone, passenger_email, selectedSeats } = req.body;

  try {
    const connection = await dbPool.getConnection();

    // Generate a unique booking reference code
    const bookingReference = `BOOK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Set expiry time (e.g., 10 minutes from now)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Step 1: Insert booking details into the bookings table
    const [bookingResult] = await connection.execute(
      "INSERT INTO bookings (train_id, passenger_name, passenger_age, passenger_phone, passenger_email, booked_at, booking_reference, expires_at, payment_status) VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, 'pending')",
      [train_id, passenger_name, passenger_age, passenger_phone, passenger_email, bookingReference, expiresAt]
    );

    const bookingId = bookingResult.insertId; // Get the ID of the newly inserted booking

    // Step 2: Update the seats table with the booking_id and mark seats as reserved
    for (const seatId of selectedSeats) {
      await connection.execute(
        "UPDATE seats SET status = 'reserved', booking_id = ? WHERE seat_id = ?",
        [bookingId, seatId]
      );

      // Step 3: Update the bookings table with the seat_id
      await connection.execute(
        "UPDATE bookings SET seat_id = ? WHERE booking_id = ?",
        [seatId, bookingId]
      );
    }

    connection.release(); // Release the connection back to the pool

    // Return booking details, including the reference code
    res.json({
      message: "Booking confirmed.",
      bookingId,
      bookingReference,
      passengerDetails: { passenger_name, passenger_age, passenger_phone, passenger_email },
      trainDetails: { train_id },
      selectedSeats,
    });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ error: "Failed to confirm booking." });
  }
});

// Chapa Payment Integration
app.post("/api/payment", async (req, res) => {
  const { bookingReference, amount, currency, email } = req.body;

  try {
    const paymentData = {
      amount,
      currency,
      email,
      tx_ref: bookingReference, // Use booking reference as transaction reference
      callback_url: "http://localhost:7676/payment-callback",
      return_url: "http://localhost:3000/success",
    };

    const response = await chapa.initialize(paymentData);
    res.json({ paymentUrl: response.data.checkout_url });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ error: "Payment failed." });
  }
});

// ------------------------------------------------------------------------------------------
// Fetch All Passengers (Admin)
app.get("/api/admin/passengers", async (req, res) => {
  const { payment_status } = req.query; // Get the payment_status query parameter

  try {
    let query = "SELECT * FROM bookings";
    const params = [];

    // Add filtering by payment status if provided
    if (payment_status) {
      query += " WHERE payment_status = ?";
      params.push(payment_status);
    }

    const [passengers] = await dbPool.query(query, params);
    res.json(passengers);
  } catch (err) {
    console.error("Error fetching passengers:", err);
    res.status(500).json({ error: "Failed to fetch passengers." });
  }
});

// Update a Passenger
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

// Delete a Passenger
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

// ------------------------------------------------------------------------------------------
// Fetch All Trains (Admin)
app.get("/api/admin/trains", async (req, res) => {
  try {
    const [trains] = await dbPool.query("SELECT * FROM trains");
    res.json(trains);
  } catch (error) {
    console.error("Error fetching trains:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Train by ID
app.delete("/api/admin/delete-train/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbPool.query("DELETE FROM trains WHERE train_id = ?", [id]);
    res.json({ message: "Train deleted successfully!" });
  } catch (error) {
    console.error("Error deleting train:", error);
    res.status(500).json({ error: "Failed to delete train" });
  }
});

// Update Train Details
app.put("/api/admin/update-train/:id", async (req, res) => {
  const { id } = req.params;
  const { name, source, destination, departure_time, arrival_time, price, seats_available } = req.body;

  try {
    await dbPool.query(
      `UPDATE trains 
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

// Add a New Train
app.post("/api/admin/add-train", async (req, res) => {
  const { train_name, source, destination, departure_time, arrival_time, seats_available, price, date, class: train_class } = req.body;
  const query = `
      INSERT INTO trains (name, source, destination, departure_time, arrival_time, seats_available, price, date, class)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [train_name, source, destination, departure_time, arrival_time, seats_available, price, date, train_class];

  try {
    await dbPool.query(query, values);
    res.status(201).send({ message: "Train added successfully!" });
  } catch (err) {
    console.error("Error adding train:", err);
    res.status(500).send({ error: "Failed to add train" });
  }
});

// ------------------------------------------------------------------------------------------
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});