const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConfig = {
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "train_booking",
};

async function seedAdmin() {
  const username = "Group One";
  const password = "Group-1@c.s"; 
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [existingAdmin] = await connection.execute(
      "SELECT * FROM Admins WHERE username = ?",
      [username]
    );

    if (existingAdmin.length > 0) {
      console.log("Admin user already exists.");
    } else {
      await connection.execute(
        "INSERT INTO Admins (username, password) VALUES (?, ?)",
        [username, hashedPassword]
      );
      console.log("Admin user created successfully.");
    }

    connection.end();
  } catch (error) {
    console.error("Error creating admin:", error.message);
  }
}

seedAdmin();
