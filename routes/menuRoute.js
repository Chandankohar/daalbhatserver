const express = require('express');
const { getAllMenus, getMenuById, addMenu, updateMenu, getRestaurantMenus, deleteMenu } = require('../controller/menueController');
const verifyrestuToken = require('../middleware/resturantAuth');
const multer = require('multer');
const router = express.Router();



// Get all menus
router.get('/',getAllMenus);
router.get('/resturant/:id',getRestaurantMenus);

// Get a specific menu by ID
router.get('/:id',getMenuById);

// Add a new menu
router.post('/',addMenu);

// Update an existing menu
router.put('/:id',updateMenu);

router.delete('/:id', deleteMenu);

module.exports = router;
