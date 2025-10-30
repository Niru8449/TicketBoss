const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { seedEvent } = require("./controllers/eventController");

dotenv.config();
connectDB();

const app = express();

// ✅ Add this BEFORE your routes
app.use(express.json());

// Routes
app.use("/reservations", require("./routes/reservationRoutes"));
app.use("/event", require("./routes/eventRoutes"));

const PORT = process.env.PORT || 3000;

// Seed the event
seedEvent();

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
