const Menu = require('../model/menu');  // assuming the menu model is in the models directory
const Restaurant = require('../model/resturant'); // assuming you have a Restaurant model

// Get all menus
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate('restaurant', 'name');  // Populate restaurant details
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menus', error: error.message });
  }
};

// Get a specific menu by ID
exports.getMenuById = async (req, res) => {
  const menuId = req.params.id;
  
  try {
    const menu = await Menu.findById(menuId).populate('restaurant', 'name');
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu', error: error.message });
  }
};

// Add a new menu
exports.addMenu = async (req, res) => {
  const { name, description, price, image, rating, cuisine, ingredients, restaurant } = req.body;
  
  try {
    const newMenu = new Menu({
      name,
      description,
      price,
      image,
      rating,
      cuisine,
      ingredients,
      restaurant
    });
    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    res.status(500).json({ message: 'Error adding menu', error: error.message });
  }
};

// Update an existing menu
exports.updateMenu = async (req, res) => {
  const menuId = req.params.id;
  const { name, description, price, image, rating, cuisine, ingredients, restaurant } = req.body;

  try {
    const updatedMenu = await Menu.findByIdAndUpdate(menuId, {
      name,
      description,
      price,
      image,
      rating,
      cuisine,
      ingredients,
      restaurant
    }, { new: true });

    if (!updatedMenu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    
    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu', error: error.message });
  }
};
