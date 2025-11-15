const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes Example

app.use("/api/contact", require("./routes/contact.routes"));

// Start Server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
