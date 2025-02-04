const FoodCourt = require('../model/FoodCourt');  // assuming the foodcourt model is in the models directory

// Get all food courts
exports.getAllFoodCourts = async (req, res) => {
  try {
    const foodCourts = await FoodCourt.find();  // Retrieve all food courts
    res.status(200).json(foodCourts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food courts', error: error.message });
  }
};

// Get a specific food court by ID
exports.getFoodCourtById = async (req, res) => {
  const foodCourtId = req.params.id;

  try {
    const foodCourt = await FoodCourt.findById(foodCourtId);  // Retrieve food court by ID
    if (!foodCourt) {
      return res.status(404).json({ message: 'Food Court not found' });
    }
    res.status(200).json(foodCourt);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food court', error: error.message });
  }
};

// Add a new food court
exports.addFoodCourt = async (req, res) => {
  const { name, image, location, university } = req.body;

  try {
    const newFoodCourt = new FoodCourt({
      name,
      image,
      location,
      university
    });

    const savedFoodCourt = await newFoodCourt.save();  // Save the food court to the database
    res.status(201).json(savedFoodCourt);
  } catch (error) {
    res.status(500).json({ message: 'Error adding food court', error: error.message });
  }
};

// Update an existing food court
exports.updateFoodCourt = async (req, res) => {
  const foodCourtId = req.params.id;
  const { name, image, location, university } = req.body;

  try {
    const updatedFoodCourt = await FoodCourt.findByIdAndUpdate(
      foodCourtId,
      { name, image, location, university },
      { new: true }  // Return the updated food court document
    );

    if (!updatedFoodCourt) {
      return res.status(404).json({ message: 'Food Court not found' });
    }

    res.status(200).json(updatedFoodCourt);
  } catch (error) {
    res.status(500).json({ message: 'Error updating food court', error: error.message });
  }
};
