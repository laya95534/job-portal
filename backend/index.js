const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job");

const app = express(); // ✅ MUST come BEFORE app.use

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/jobs", jobRoutes); // ✅ Now correct

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// Start server
app.listen(5001, () => {
  console.log("Server running on port 5001");
});