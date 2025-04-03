const Restaurant = require('../model/restaurant');  // assuming the restaurant model is in the models directory
const FoodCourt = require('../model/FoodCourt');  // assuming you have a FoodCourt model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('foodCourt', 'name');  // Populate related fields
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
  }
};

// Get a specific restaurant by ID
exports.getRestaurantById = async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const restaurant = await Restaurant.findById(restaurantId).populate('foodCourt', 'name');
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant', error: error.message });
  }
};

// Add a new restaurant
exports.addRestaurant = async (req, res) => {
  const { name, location, registerid, contact, description, email, cuisine, foodCourt, password } = req.body;
  
 const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Check if the food court exists
    const resturantExists = await Restaurant.find({email});
    if (resturantExists) {
      return res.status(400).json({ message: 'Resturant already exist' });
    }

    const foodCourtExists = await FoodCourt.findById(foodCourt);
    if (!foodCourtExists) {
      return res.status(400).json({ message: 'Food Court does not exist' });
    }

    const newRestaurant = new Restaurant({
      name,
      email,
      location,
      registerid,
      contact,
      description,
      cuisine,
      foodCourt,
      password:hashedPassword,
    });

    const user = await newRestaurant.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.password=null
    res.status(201).json({token,user});
  } catch (error) {
    res.status(500).json({ message: 'Error adding restaurant', error: error.message });
  }
};

exports.resturantLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Restaurant.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.password=null
    res.status(200).json({ token ,user});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing restaurant
exports.updateRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  const { name, location,  contact, description,  cuisine, foodCourt } = req.body;

  try {
    // Find and update the restaurant
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { name, location,  contact, description,  cuisine, foodCourt, },
      { new: true }  // Return the updated restaurant
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error updating restaurant', error: error.message });
  }
};

exports.getRestaurantsByFoodCourt = async (req, res) => {
  try {
    const { foodCourtId } = req.params;
    
    // Query restaurants with the specified foodCourt id
    const restaurants = await Restaurant.find({ foodCourt: foodCourtId });
    
    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No restaurants found for this FoodCourt'
      });
    }
    
    res.status(200).json({
      success: true,
      data: restaurants
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};
