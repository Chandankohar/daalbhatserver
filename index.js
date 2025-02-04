require("dotenv").config();
const express = require("express");
const connectDB = require("./config/databaseConnection");

const userRoute = require("./routes/userRoute");
const restaurantRoutes = require("./routes/resturantRoute");
const foodcourtRoute = require("./routes/foodcourtRoute");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", userRoute);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foodcourts", foodcourtRoute);

// Connect to DB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
