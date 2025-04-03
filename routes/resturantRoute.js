const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/resturantController');

// Get all restaurants
router.get('/', restaurantController.getAllRestaurants);
router.get('/foodcourt/:foodCourtId', restaurantController.getRestaurantsByFoodCourt);

// Get a specific restaurant by ID
router.get('/:id', restaurantController.getRestaurantById);

// Add a new restaurant
router.post('/', restaurantController.addRestaurant);
router.post('/login', restaurantController.resturantLogin);
// Update an existing restaurant
router.put('/:id', restaurantController.updateRestaurant);

module.exports = router;
