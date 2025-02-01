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
app.post("/api/search-trains", async (req, res) => {
    const { source, destination, date } = req.body;
  
    try {
      const connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute(
        "SELECT train_id, name, source, destination, departure_time, arrival_time, date, price, seats_available, class FROM trains WHERE source = ? AND destination = ? AND date = ?",
        [source, destination, date]
      );
  
      res.json(rows);
    } catch (error) {
      console.error("Error fetching trains:", error);
      res.status(500).json({ error: "Failed to fetch train data." });
    }
  });
  
//   app.post("/api/confirm-booking", async (req, res) => {
//     const { train_id, passenger_name, passenger_age, passenger_phone, passenger_email } = req.body;
  
//     try {
//       const connection = await mysql.createConnection(dbConfig);
//       await connection.execute(
//         "INSERT INTO bookings (train_id, passenger_name, passenger_age, passenger_phone, passenger_email, booked_at) VALUES (?, ?, ?, ?, ?, NOW())",
//         [train_id, passenger_name, passenger_age, passenger_phone, passenger_email]
//       );
  
//       res.json({ message: "Booking confirmed." });
//     } catch (error) {
//       console.error("Error confirming booking:", error);
//       res.status(500).json({ error: "Failed to confirm booking." });
//     }
//   });

// app.post("/api/confirm-booking", async (req, res) => {
//     const { train_id, passenger_name, passenger_age, passenger_phone, passenger_email, selectedSeats } = req.body;
  
//     try {
//       const connection = await mysql.createConnection(dbConfig);
//       await connection.execute(
//         "INSERT INTO bookings (train_id, passenger_name, passenger_age, passenger_phone, passenger_email, booked_at) VALUES (?, ?, ?, ?, ?, NOW())",
//         [train_id, passenger_name, passenger_age, passenger_phone, passenger_email]
//       );
  
//       // Update seat status to 'reserved'
//       for (const seatId of selectedSeats) {
//         await connection.execute(
//           "UPDATE seats SET status = 'reserved' WHERE id = ?",
//           [seatId]
//         );
//       }
  
//       res.json({ message: "Booking confirmed." });
//     } catch (error) {
//       console.error("Error confirming booking:", error);
//       res.status(500).json({ error: "Failed to confirm booking." });
//     }
//   });
  
// Fetch seats for a specific train
app.get('/seats/:trainId', async (req, res) => {
    const trainId = req.params.trainId;
    // console.log(`Fetching seats for train ID: ${trainId}`);
  
    try {
      const connection = await dbPool.getConnection();
      const [rows] = await connection.query('SELECT * FROM seats WHERE train_id = ?', [trainId]);
      connection.release(); // Release the connection back to the pool
  
      console.log("Seats fetched:", rows);
      res.send(rows);
    } catch (error) {
      console.error("Error fetching seats:", error);
      res.status(500).json({ error: "Failed to fetch seat data." });
    }
  });
  
  // Update seat status
  app.post('/seats/update', (req, res) => {
    const { seatId, status } = req.body;
    const sql = 'UPDATE seats SET status = ? WHERE id = ?';
    dbPool.query(sql, [status, seatId], (err, result) => {
      if (err) throw err;
      res.send('Seat status updated');
    });
  });
  
//   Confirm booking
app.post("/api/confirm-booking", async (req, res) => {
    const { train_id, passenger_name, passenger_age, passenger_phone, passenger_email, selectedSeats } = req.body;
  
    try {
      const connection = await dbPool.getConnection();
  
      // Step 1: Insert booking details into the bookings table
      const [bookingResult] = await connection.execute(
        "INSERT INTO bookings (train_id, passenger_name, passenger_age, passenger_phone, passenger_email, booked_at) VALUES (?, ?, ?, ?, ?, NOW())",
        [train_id, passenger_name, passenger_age, passenger_phone, passenger_email]
      );
  
      const bookingId = bookingResult.insertId; // Get the ID of the newly inserted booking
  
      // Step 2: Update the seats table with the booking_id and mark seats as reserved
      for (const seatId of selectedSeats) {
        await connection.execute(
          "UPDATE seats SET status = 'reserved', booking_id = ? WHERE seat_id = ?", // Updated to use 'seat_id'
          [bookingId, seatId]
        );
  
        // Step 3: Update the bookings table with the seat_id
        await connection.execute(
          "UPDATE bookings SET seat_id = ? WHERE booking_id = ?", // Updated to use 'seat_id'
          [seatId, bookingId]
        );
      }
  
      connection.release(); // Release the connection back to the pool
  
      res.json({ message: "Booking confirmed.", bookingId });
    } catch (error) {
      console.error("Error confirming booking:", error);
      res.status(500).json({ error: "Failed to confirm booking." });
    }
  });

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
app.get('/api/admin/trains', async (req, res) => {
  try {
      const [trains] = await dbPool.query("SELECT * FROM trains");
      res.json(trains);
  } catch (error) {
      console.error("Error fetching trains:", error);
      res.status(500).json({ error: "Internal server error" });
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

// Add a new train
app.post('/api/admin/add-train', async (req, res) => {
  const { train_name, source, destination, departure_time, arrival_time, seats_available, price, date, class: train_class } = req.body;
  const query = `
      INSERT INTO trains (name, source, destination, departure_time, arrival_time, seats_available, price, date, class)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [train_name, source, destination, departure_time, arrival_time, seats_available, price, date, train_class];

  try {
      await dbPool.query(query, values);
      res.status(201).send({ message: 'Train added successfully!' });
  } catch (err) {
      console.error('Error adding train:', err);
      res.status(500).send({ error: 'Failed to add train' });
  }
});

// ------------------------------------------------------------------
// Fetch all seats
app.get('/api/seats', (req, res) => {
    dbPool.query('SELECT * FROM seats', (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Error fetching seats' });
      }
      res.json(results);
    });
  });
  
  // Update seat status
  app.post('/api/seats/:id/book', (req, res) => {
    const { id } = req.params;
    const { bookedBy } = req.body;
  
    dbPool.query(
      'UPDATE seats SET isBooked = TRUE, bookedBy = ? WHERE id = ?',
      [bookedBy, id],
      (error, results) => {
        if (error) {
          return res.status(500).json({ message: 'Error updating seat' });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Seat not found' });
        }
        res.json({ message: 'Seat booked successfully' });
      }
    );
  });


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
