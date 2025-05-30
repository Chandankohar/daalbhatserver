const express = require('express');
const router = express.Router();
const foodCourtController = require('../controller/foodCourtController');
const verifyToken = require('../middleware/userAuth');

// Get all food courts
router.get('/', foodCourtController.getAllFoodCourts);

// Get a specific food court by ID
router.get('/:id', foodCourtController.getFoodCourtById);

// Add a new food court
router.post('/',foodCourtController.addFoodCourt);

// Update an existing food court
router.put('/:id',verifyToken, foodCourtController.updateFoodCourt);

module.exports = router;
