const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve React's build folder
app.use(express.static(path.join(__dirname, "build")));

// API routes
app.get("/api/trains", (req, res) => {
  res.json({ message: "Train data here" }); // Example
});

// Handle all other routes with React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
