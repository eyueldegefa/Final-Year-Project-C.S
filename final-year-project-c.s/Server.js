// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mysql = require("mysql2");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const app = express();
// const PORT = 7676;

// // -------------------------------
// // Middleware
// // -------------------------------
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static("build")); // Serve static files from the "build" folder

// // -------------------------------
// // MySQL Connection
// // -------------------------------
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root", // MySQL username
//   password: process.env.DB_PASSWORD, // Password from .env
//   database: "train_booking", // Database name
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("Connected to the MySQL database.");
// });

// // Wrap connection in promises
// const promiseDb = db.promise();

// // -------------------------------
// // API Routes
// // -------------------------------

// // 1. Search Trains
// app.post("/api/search-trains", async (req, res) => {
//   const { source, destination, date } = req.body;

//   if (!source || !destination || !date) {
//     return res.status(400).json({ error: "Source, destination, and date are required." });
//   }

//   try {
//     const [results] = await promiseDb.query(
//       "SELECT * FROM trains WHERE source = ? AND destination = ? AND date = ?",
//       [source, destination, date]
//     );
//     res.json(results);
//   } catch (err) {
//     console.error("Error fetching trains:", err);
//     res.status(500).json({ error: "Failed to fetch train data." });
//   }
// });

// // 2. Fetch Train Seats
// app.get("/api/train-seats/:trainId", async (req, res) => {
//   const { trainId } = req.params;
//   console.log("Received trainId:", trainId); // Debugging log

//   try {
//     const [rows] = await db.promise().query("SELECT * FROM seats WHERE train_id = ?", [trainId]);
//     if (rows.length === 0) {
//       return res.status(404).json({ error: "No seats found for this train." });
//     }
//     res.json(rows);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch seats." });
//   }
// });


// // 3. Book a Seat
// app.post("/book", async (req, res) => {
//   const {
//     train_id,
//     passenger_name,
//     passenger_age,
//     passenger_phone,
//     passenger_email,
//     selected_seat,
//   } = req.body;

//   if (
//     !train_id ||
//     !passenger_name ||
//     !passenger_age ||
//     !passenger_phone ||
//     !passenger_email ||
//     !selected_seat
//   ) {
//     return res.status(400).send("All booking details are required.");
//   }

//   if (typeof passenger_age !== "number" || passenger_age <= 0) {
//     return res.status(400).send("Passenger age must be a positive number.");
//   }
//   if (!/^\d{10}$/.test(passenger_phone)) {
//     return res.status(400).send("Invalid phone number format.");
//   }
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger_email)) {
//     return res.status(400).send("Invalid email address.");
//   }

//   try {
//     // Start a transaction
//     await promiseDb.beginTransaction();

//     // Step 1: Mark the seat as booked
//     const [seatUpdateResult] = await promiseDb.query(
//       "UPDATE seats SET booked = 1 WHERE train_id = ? AND seat_number = ? AND isBooked = 0",
//       [train_id, selected_seat]
//     );

//     if (seatUpdateResult.affectedRows === 0) {
//       await promiseDb.rollback();
//       return res.status(400).send("Seat already booked or invalid.");
//     }

//     // Step 2: Insert booking details
//     await promiseDb.query(
//       `INSERT INTO bookings 
//       (train_id, passenger_name, passenger_age, passenger_phone, passenger_email, selected_seat, booked_at) 
//       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
//       [train_id, passenger_name, passenger_age, passenger_phone, passenger_email, selected_seat]
//     );

//     // Commit the transaction
//     await promiseDb.commit();
//     res.status(200).send("Seat booked successfully!");
//   } catch (err) {
//     console.error("Error during booking transaction:", err);
//     await promiseDb.rollback();
//     res.status(500).send("Failed to book the seat.");
//   }
// });


// // -------------------------------
// // Error Handling Middleware
// // -------------------------------
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

// // -------------------------------
// // Start Server
// // -------------------------------
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const nodemailer = require("nodemailer"); // For email functionality
require("dotenv").config();

const app = express();
const PORT = 7676;

// -------------------------------
// Middleware
// -------------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("build")); // Serve static files from the "build" folder

// -------------------------------
// MySQL Connection
// -------------------------------
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // MySQL username
  password: process.env.DB_PASSWORD, // Password from .env
  database: "train_booking", // Database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Wrap connection in promises
const promiseDb = db.promise();

// -------------------------------
// Nodemailer Configuration
// -------------------------------
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

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
    const [results] = await promiseDb.query(
      "SELECT train_id, name, source, destination, departure_time AS departure, arrival_time AS arrival, date, price, seats_available AS seatsAvailable, class FROM trains WHERE source = ? AND destination = ? AND date = ?",
      [source, destination, date]
    );
    res.json(results);
  } catch (err) {
    console.error("Error fetching trains:", err);
    res.status(500).json({ error: "Failed to fetch train data." });
  }
});


// 2. Confirm Booking and Send Email
app.post("/api/confirm-booking", async (req, res) => {
  const { train_id, passenger_name, passenger_age, passenger_phone, passenger_email } = req.body;

  // Validate incoming data
  if (!train_id || !passenger_name || !passenger_age || !passenger_phone || !passenger_email) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Insert booking details into the "bookings" table
    const query = `
      INSERT INTO bookings (train_id, passenger_name, passenger_age, passenger_phone, passenger_email, booked_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;

    const [result] = await promiseDb.query(query, [
      train_id,
      passenger_name,
      passenger_age,
      passenger_phone,
      passenger_email,
    ]);

    console.log("Booking confirmed:", result);
    res.status(200).json({ message: "Booking confirmed successfully!" });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ error: "Failed to confirm booking." });
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
