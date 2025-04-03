const { default: mongoose } = require('mongoose');
const Menu = require('../model/menu');  // assuming the menu model is in the models directory

// Get all menus
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate('restaurant', 'name');  // Populate restaurant details
    res.status(200).json({data:menus});
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
    res.status(200).json({data:menu,success:true});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu', error: error.message });
  }
};

// Add a new menu
exports.addMenu = async (req, res) => {
 
const { name, description, price,image, cuisine, ingredients, restaurant } = req.body;
  if (!name || !price || !cuisine ||!image || !ingredients || !restaurant) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const newMenu = new Menu({
      name,
      description,
      price,
      image,
      rating:'0',
      cuisine,
      ingredients,
      restaurant
    });
    
    
    const savedMenu = await newMenu.save();
    res.status(201).json({data:savedMenu,success:true});
  } catch (error) {
    res.status(500).json({ message: 'Error adding menu', error: error.message });
  }
};

// Update an existing menu
exports.updateMenu = async (req, res) => {
  const menuId = req.params.id;

 
  const { name, description, price,image, cuisine, ingredients, restaurant } = req.body;
  if (!name || !price || !cuisine || !image || !ingredients || !restaurant) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(menuId, {
      name,
      description,
      price,
      image,
      cuisine,
      ingredients,
      restaurant
    }, { new: true });

    if (!updatedMenu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    
    res.status(200).json({data:updatedMenu,success:true});
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu', error: error.message });
  }
};



exports.getRestaurantMenus = async (req, res) => {
  try {
    const { id } = req.params;

    // Find all menus associated with the specified restaurant
    const menus = await Menu.find({restaurant: id});

    if (!menus || menus.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No menus found for this restaurant',
      });
    }

    res.status(200).json({
      success: true,
      data:menus,
    });
  } catch (error) {
    console.error('Error fetching restaurant menus:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteMenu = async (req, res) => {
  try {
      const { id } = req.params;
      
      // Check if the menu exists
      const menu = await Menu.findById(id);
      if (!menu) {
          return res.status(404).json({ message: "Menu not found" });
      }

      // Delete the menu
      await Menu.findByIdAndDelete(id);

      res.status(200).json({ message: "Menu deleted successfully" ,success:true});
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};