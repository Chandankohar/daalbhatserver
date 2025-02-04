const Restaurant = require('../model/resturant');  // assuming the restaurant model is in the models directory
const FoodCourt = require('../model/FoodCourt');  // assuming you have a FoodCourt model

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('foodCourt', 'name').populate('menus', 'name price');  // Populate related fields
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
  }
};

// Get a specific restaurant by ID
exports.getRestaurantById = async (req, res) => {
  const restaurantId = req.params.id;

  try {
    const restaurant = await Restaurant.findById(restaurantId).populate('foodCourt', 'name').populate('menus', 'name price');
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
  const { name, location, registerid, contact, description, rating, cuisine, foodCourt, menus, role } = req.body;

  try {
    // Check if the food court exists
    const foodCourtExists = await FoodCourt.findById(foodCourt);
    if (!foodCourtExists) {
      return res.status(400).json({ message: 'Food Court does not exist' });
    }

    const newRestaurant = new Restaurant({
      name,
      location,
      registerid,
      contact,
      description,
      rating,
      cuisine,
      foodCourt,
      menus,
      role
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error adding restaurant', error: error.message });
  }
};

// Update an existing restaurant
exports.updateRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  const { name, location, registerid, contact, description, rating, cuisine, foodCourt, menus, role } = req.body;

  try {
    // Find and update the restaurant
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { name, location, registerid, contact, description, rating, cuisine, foodCourt, menus, role },
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
