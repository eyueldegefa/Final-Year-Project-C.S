require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cron = require("node-cron");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const chapa = require("chapa").default;
const axios = require("axios");
const { data } = require("react-router-dom");

const app = express();
const PORT = 7676;
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY || 'CHASECK_TEST-ub2djNjB6gXgWgSJGTPtSHu3BKahzhNV';

// Middleware
app.use(cors());
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

// ---------------------------------------------------------------------------------------
const authenticate = async (req, res, next) => {
  try {
    // 1️⃣ Retrieve token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // 2️⃣ Verify token
    let verified;
    try {
      verified = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Token expired. Please log in again.' });
      }
      return res.status(401).json({ message: 'Invalid token' });
    }

    console.log('Verified Token:', verified);

    // 3️⃣ Find user in the database
    const [users] = await dbPool.query('SELECT * FROM users WHERE id = ?', [verified.id]);

    // 4️⃣ Check if user exists
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid token: User not found' });
    }

    req.user = users[0]; // Attach user info to request object
    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const passWord = await (passWord);
    
    const [existing] = await dbPool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (existing.length > 0) {
      return res.status(400).send('User already exists');
    }

    await dbPool.query(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [email, passWord, 'user']
    );
    alert("You are registered successfully!");
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// -----------------------------------------------
app.post('/api/login', async (req, res) => { 
  try {
    const { email, password, role } = req.body;
    console.log('Login attempt:', { email, role });

    // 1️⃣ Find user by email
    const [users] = await dbPool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    console.log('DB results:', users);

    if (users.length === 0) {
      console.log('No user found with email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    console.log('Found user:', user);

    // 2️⃣ Verify role
    if (user.role !== role) {
      console.log(`Role mismatch: DB role=${user.role} vs requested=${role}`);
      return res.status(403).json({ message: 'Access forbidden for this role' });
    }

    // 3️⃣ Directly compare passwords
    console.log('Entered password:', password);
    console.log('Stored password:', user.password);
    
    if (password !== user.password) {
      console.log('Password comparison failed');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 4️⃣ Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login successful for:', email);
    res.json({ token, role: user.role, email: user.email });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Protected route example
app.get('/api/user-data', authenticate, (req, res) => {
  res.json(req.user);
});
// -------------------------------------------------------------------------------------------
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

// Manage Bookings
// -----------------------------------------------------------------------------
// Fetch passenger by booking_reference and passengerl_name
app.get("/api/bookings/get-bookings", async (req, res) => {
  const { booking_reference, passengerl_name } = req.query; // ✅ Use correct keys

  if (!booking_reference || !passengerl_name) {
    return res.status(400).json({ message: "Missing required parameters." });
  }

  try {
    const connection = await dbPool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM bookings WHERE booking_reference = ? AND passengerl_name = ?",
      [booking_reference, passengerl_name]
    );
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: "No booking found." });
    }

    res.json(rows[0]); // ✅ Send only the first matching result
  } catch (error) {
    console.error("Error fetching passenger data:", error);
    res.status(500).json({ message: "Error fetching passenger data." });
  }
});

// Update booked Date
app.put("/api/bookings/update-date", async (req, res) => {
  const { booking_reference, passengerl_name, new_date } = req.body;

  if (!booking_reference || !passengerl_name || !new_date) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const updateQuery = `UPDATE bookings SET booked_at = ? WHERE booking_reference = ? AND passengerl_name = ?`;
    const values = [new_date, booking_reference, passengerl_name];

    const [result] = await dbPool.execute(updateQuery, values);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Date updated successfully!" });
    } else {
      res.status(404).json({ success: false, message: "Booking not found" });
    }
  } catch (error) {
    console.error("Error updating date:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// Cancel booking
app.post("/api/bookings/cancel-ticket", async (req, res) => {
  const { booking_reference, passengerl_name, canceled_date } = req.body;

  if (!booking_reference || !passengerl_name || !canceled_date) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const connection = await dbPool.getConnection();
    await connection.execute(
      "INSERT INTO canceled_tickets (booking_reference, passengerl_name, canceled_at) VALUES (?, ?, ?)",
      [booking_reference, passengerl_name, canceled_date]
    );
    await connection.execute(
      "DELETE FROM bookings WHERE booking_reference = ? AND passengerl_name = ?",
      [booking_reference, passengerl_name]
    );
    connection.release();

    res.json({ success: true, message: "Ticket canceled successfully" });
  } catch (error) {
    console.error("Error canceling ticket:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// --------------------------------------------------------------------------------------------------------
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
// ----------------------------------------------------------------------------------------
// Confirm Booking 
// ----------------------------------------------------------------------------------------
app.post("/api/confirm-booking", async (req, res) => {
  const { train_id, passengerf_name, passengerl_name, passenger_dateofbirth, passenger_phone, passenger_email, selectedSeats } = req.body;

  try {
    const connection = await dbPool.getConnection();

    // Generate a unique booking reference code
    const bookingReference = `ER${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Set expiry time (e.g., 10 minutes from now)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const booked_at = Date.now();

    const amount = "3450"; //fixed amount for now

    // Step 1: Insert booking details into the bookings table
    const [bookingResult] = await connection.execute(
      "INSERT INTO bookings (train_id, passengerf_name, passengerl_name, passenger_dateofbirth, passenger_phone, passenger_email, booked_at, booking_reference, expires_at, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [train_id, passengerf_name, passengerl_name, passenger_dateofbirth, passenger_phone, passenger_email, booked_at, bookingReference, expiresAt,  amount]
    );

    const bookingId = bookingResult.insertId; // Get the ID of the newly inserted booking

    // Step 2: Update the seats table with the booking_id and mark seats as reserved
    for (const seatId of selectedSeats) {
      await connection.execute(
        "UPDATE seats SET status = 'reserved', booking_id = ? WHERE seat_id = ?",
        [bookingId, seatId]
      );

      // Step 2: Update the bookings table with the seat_id
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
      passengerDetails: { passengerf_name, passengerl_name, passenger_dateofbirth, passenger_phone, passenger_email },
      trainDetails: { train_id },
      selectedSeats,
    });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ error: "Failed to confirm booking." });
  }
});

// Initialize Payment
// ----------------------------------------------------------------------------------------
app.post("/api/payment", async (req, res) => {
  const { bookingReference, amount, currency, passenger_email, passengerf_name, passengerl_name, passenger_phone } = req.body;

  try {
    const paymentData = {
      amount: amount.toString(), // Convert amount to string
      currency: currency || "ETB", // Default to ETB if not provided
      email: passenger_email || "firstgroup@gmail.com",
      first_name: passengerf_name || "Group",
      last_name: passengerl_name || "One",
      phone_number: passenger_phone || "0912345678",
      tx_ref: bookingReference, // Use booking reference as transaction reference
      callback_url: "http://localhost:7676/api/payment/callback", // Callback URL for payment success
      return_url: "http://localhost:3000/success", // Redirect to frontend Success page
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


// ----------------------------------------------------------------
const updateBookingStatus = async (bookingReference, status) => {
  try {
    const query = `
      UPDATE bookings
      SET status = ?
      WHERE booking_reference = ?
    `;
    const values = [status, bookingReference];

    const [result] = await dbPool.execute(query, values);

    if (result.affectedRows === 0) {
      throw new Error("Booking not found.");
    }

    return result;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

// -------------------------------------------------------
app.post("/api/payment/callback", async (req, res) => {
  const { tx_ref, status } = req.body;
  console.log("Received callback:", { tx_ref, status }); // Log the callback data

  try {
    if (status === "success") {
      await updateBookingStatus(tx_ref, "paid");
      res.redirect(`http://localhost:3000/success?bookingReference=${tx_ref}`);
    } else {
      res.redirect("http://localhost:3000/payment-failed");
    }
  } catch (error) {
    console.error("Callback error:", error);
    res.status(500).json({ error: "Failed to process payment callback." });
  }
});
// ------------------------------------------------------------------------------------------------

// Admin Part

// const password = 'Group-1@c.s'; // Your plain text password
// bcrypt.hash(password, 10, (err, hashedPassword) => {
//   if (err) throw err;
//   const email = 'firstgroup@gmail.com';
//   dbPool.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
//     if (err) throw err;
//     console.log('Admin inserted into the database');
//   });
// });

// -----------------------------------------------------------------------------------------------
// Admin login route

app.post("/admin/login", (req, res) => {
  const sql = "SELECT * FROM admins WHERE email = ? AND password = ?";

  dbPool.query(sql, [req.body.email, req.body.password], (err, data) => {
    if(err) return res.json(err);
    if(data.length > 0){
      return res.json("Login Successfully!");
    }else{
      return res.json("No Data!");
    }
  });
});
// app.post("/admin/login", (req, res) => {
//   const { email, password } = req.body;

//   console.log("Login attempt:", email);

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   dbPool.query("SELECT * FROM admins WHERE email = ?", [email], (err, result) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ message: "Internal server error" });
//     }

//     if (result.length === 0) {
//       console.log("Email not found:", email);
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const storedPassword = result[0].password;
//     console.log("Stored password (hashed):", storedPassword);

//     bcrypt.compare(password, storedPassword, (err, isMatch) => {
//       if (err) {
//         console.error("Error comparing password:", err);
//         return res.status(500).json({ message: "Error verifying password" });
//       }

//       console.log("Password match result:", isMatch);

//       if (!isMatch) {
//         console.log("Invalid password attempt for:", email);
//         return res.status(401).json({ message: "Invalid email or password" });
//       }

//       console.log("Login successful for:", email);
//       return res.status(200).json({ message: "Login successful!" });
//     });
//   });
// });

// -----------------------------------------------------------------------------------------------
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

//Search by booking reference
app.get('/api/admin/passengers/search', async (req, res) => {
  const { booking_reference } = req.query;
  
  console.log("Received booking_reference:", booking_reference);  // Log for debugging
  
  if (!booking_reference) {
      return res.status(400).json({ message: 'Booking reference is required.' });
  }

  try {
      // Assuming your database query might look like this
      const query = "SELECT * FROM bookings WHERE booking_reference = ?";
      const [rows] = await dbPool.execute(query, [booking_reference]);

      if (rows.length === 0) {
          return res.status(404).json({ message: 'Passenger not found.' });
      }

      res.json(rows);
  } catch (err) {
      console.error("Error in database query:", err);
      res.status(500).json({ message: 'Error fetching passenger' });
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
app.post('/api/admin/add-train', async (req, res) => {
  console.log("Received Data:", req.body); // Debugging
  const { name, source, destination, departure_time, arrival_time, seats_available, price, date, class: trainClass } = req.body;

  if (!name) {
      return res.status(400).json({ error: "Train name is required!" });
  }

  try {
      const sql = `INSERT INTO trains (name, source, destination, departure_time, arrival_time, seats_available, price, date, class) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      await dbPool.query(sql, [name, source, destination, departure_time, arrival_time, seats_available, price, date, trainClass]);
      res.json({ message: "Train added successfully!" });
  } catch (error) {
      console.error("Error adding train:", error);
      res.status(500).json({ error: "Database error" });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});