require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cron = require("node-cron");
const chapa = require("chapa").default;
const axios = require("axios");

const app = express();
const PORT = 7676;
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY || 'CHASECK_TEST-ub2djNjB6gXgWgSJGTPtSHu3BKahzhNV';

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
  const {
    train_id,
    passengerf_name,
    passengerl_name,
    passenger_dateofbirth,
    passenger_phone,
    passenger_email,
    selectedSeats,
    amount,
  } = req.body;

  // Debug: Log the request body
  console.log("Request body:", req.body);

  // Validate required fields
  if (
    !train_id ||
    !passengerf_name ||
    !passengerl_name ||
    !passenger_dateofbirth ||
    !passenger_phone ||
    !passenger_email ||
    !selectedSeats ||
    !amount
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const connection = await dbPool.getConnection();
    const bookingReference = `BOOK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Insert booking details into the bookings table
    const [bookingResult] = await connection.execute(
      "INSERT INTO bookings (train_id, passengerf_name, passengerl_name, passenger_dateofbirth, passenger_phone, passenger_email, booked_at, booking_reference, expires_at, payment_status, amount) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?, 'pending', ?)",
      [
        train_id,
        passengerf_name,
        passengerl_name,
        passenger_dateofbirth,
        passenger_phone,
        passenger_email,
        bookingReference,
        expiresAt,
        amount,
      ]
    );

    const bookingId = bookingResult.insertId;

    // Update the seats table with the booking_id and mark seats as reserved
    for (const seatId of selectedSeats) {
      await connection.execute(
        "UPDATE seats SET status = 'reserved', booking_id = ? WHERE seat_id = ?",
        [bookingId, seatId]
      );

      // Update the bookings table with the seat_id
      await connection.execute(
        "UPDATE bookings SET seat_id = ? WHERE booking_id = ?",
        [seatId, bookingId]
      );
    }

    connection.release();

    res.json({
      message: "Booking confirmed.",
      bookingId,
      bookingReference,
      passengerDetails: { passengerf_name, passengerl_name, passenger_dateofbirth, passenger_phone, passenger_email },
      trainDetails: { train_id },
      selectedSeats,
    });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ error: "Failed to confirm booking." });
  }
});


// Chapa Payment Integration
// Chapa Payment Integration
app.post("/api/payment", async (req, res) => {
  const { bookingReference, amount, currency, email, firstName, lastName, phoneNumber } = req.body;

  try {
    const paymentData = {
      amount: amount.toString(), // Convert amount to string
      currency: currency || "ETB", // Default to ETB if not provided
      email: email || "firstgroup545@gmail.com", // Default email if not provided
      first_name: firstName || "User", // Default first name if not provided
      last_name: lastName || "Test", // Default last name if not provided
      phone_number: phoneNumber || "0912345678", // Default phone number if not provided
      tx_ref: bookingReference, // Use booking reference as transaction reference
      callback_url: "http://localhost:7676/payment-callback", // Replace with your callback URL
      return_url: "http://localhost:7676/success", // Replace with your return URL
      customization: {
        title: "Train Booking", // Ensure this is 16 characters or less
        description: "Booking Payment", // Ensure this contains only allowed characters
      },
    };

    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      res.json({ paymentUrl: response.data.data.checkout_url });
    } else {
      res.status(500).json({ error: "Failed to initialize payment." });
    }
  } catch (error) {
    console.error("Payment error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Payment failed." });
  }
});

// Callback 
app.post("/payment-callback", async (req, res) => {
  const { tx_ref, status } = req.body;

  if (status === "success") {
    try {
      const connection = await dbPool.getConnection();

      // Step 1: Update the booking status to "paid"
      await connection.execute(
        "UPDATE bookings SET payment_status = 'paid' WHERE booking_reference = ?",
        [tx_ref]
      );

      // Step 2: Insert payment details into the payments table
      const [booking] = await connection.execute(
        "SELECT * FROM bookings WHERE booking_reference = ?",
        [tx_ref]
      );

      if (booking.length > 0) {
        const { booking_id, train_id, passengerf_name, passengerl_name, passenger_email, passenger_phone, amount } = booking[0];

        await connection.execute(
          "INSERT INTO payments (booking_id, train_id, passenger_name, passenger_email, passenger_phone, amount, payment_status, payment_date) VALUES (?, ?, ?, ?, ?, ?, 'paid', NOW())",
          [booking_id, train_id, `${passengerf_name} ${passengerl_name}`, passenger_email, passenger_phone, amount]
        );
      }

      connection.release();
      console.log(`Payment for booking ${tx_ref} was successful. Database updated.`);
    } catch (error) {
      console.error("Error updating database after payment:", error);
    }
  } else {
    console.log(`Payment for booking ${tx_ref} failed.`);
  }

  res.sendStatus(200); // Always send a response to Chapa
});

// Fetch All Passengers (Admin)
app.get("/api/admin/passengers", async (req, res) => {
  const { payment_status } = req.query;

  try {
    let query = "SELECT * FROM bookings";
    const params = [];

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
  const { passengerf_name, passengerl_name, passenger_dateofbirth, passenger_phone, passenger_email } = req.body;

  try {
    const [result] = await dbPool.query(
      `UPDATE bookings 
       SET passengerf_name = ?, passengerl_name = ?, passenger_dateofbirth = ?, passenger_phone = ?, passenger_email = ? 
       WHERE booking_id = ?`,
      [passengerf_name, passengerl_name, passenger_dateofbirth, passenger_phone, passenger_email, id]
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
    const [result] = await dbPool.query("DELETE FROM bookings WHERE booking_id = ?", [id]);

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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});