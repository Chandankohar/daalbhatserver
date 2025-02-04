const express = require('express');
const router = express.Router();
const foodCourtController = require('../controller/foodCourtController');
const verifyToken = require('../middleware/userAuth');

// Get all food courts
router.get('/foodcourts', foodCourtController.getAllFoodCourts);

// Get a specific food court by ID
router.get('/foodcourts/:id', foodCourtController.getFoodCourtById);

// Add a new food court
router.post('/foodcourts',verifyToken, foodCourtController.addFoodCourt);

// Update an existing food court
router.put('/foodcourts/:id',verifyToken, foodCourtController.updateFoodCourt);

module.exports = router;
