const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/resturantController');

// Get all restaurants
router.get('/restaurants', restaurantController.getAllRestaurants);

// Get a specific restaurant by ID
router.get('/restaurants/:id', restaurantController.getRestaurantById);

// Add a new restaurant
router.post('/restaurants', restaurantController.addRestaurant);

// Update an existing restaurant
router.put('/restaurants/:id', restaurantController.updateRestaurant);

module.exports = router;
