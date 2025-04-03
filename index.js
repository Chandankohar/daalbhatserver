require("dotenv").config();
const express = require("express");
const connectDB = require("./config/databaseConnection");

const userRoute = require("./routes/userRoute");
const restaurantRoutes = require("./routes/resturantRoute");
const foodcourtRoute = require("./routes/foodcourtRoute");
const menuRoute=require('./routes/menuRoute')
const menureviewsRoute=require('./routes/menureviewsRoute')
const restaurantreviewsRoute=require('./routes/restaurantreviewsRoute')

const cors=require('cors')
const app = express();
app.use(cors())
// Middleware
app.use(express.json({ limit: '50mb' }));

// Routes
app.use("/api/auth", userRoute);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foodcourts", foodcourtRoute);
app.use("/api/menus", menuRoute);
app.use("/api/menureviews", menureviewsRoute);
app.use("/api/restaurantreviews", restaurantreviewsRoute);


// Connect to DB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
