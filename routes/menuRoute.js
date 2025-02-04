const express = require('express');
const { getAllMenus, getMenuById, addMenu, updateMenu } = require('../controller/menueController');
const verifyrestuToken = require('../middleware/resturantAuth');
const router = express.Router();


// Get all menus
router.get('/menus',getAllMenus);

// Get a specific menu by ID
router.get('/menus/:id',getMenuById);

// Add a new menu
router.post('/menus',verifyrestuToken,addMenu);

// Update an existing menu
router.put('/menus/:id',verifyrestuToken,updateMenu);

module.exports = router;
