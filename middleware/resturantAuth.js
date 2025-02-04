const jwt = require("jsonwebtoken");
const Resturant = require("../model/resturant"); // Assuming you have a User model in the 'models' folder

const verifyrestuToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  
  // If no token is provided
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to the request
    req.resturant = verified;

    // Verify user exists in the database
    const resturant = await Resturant.findById(verified._id); // assuming `_id` is stored in the token

    if (resturant && resturant?.role==='resturant') {
        next();
      
    }

    return res.status(404).json({ message: "User not found" });

    // If user is found, proceed to next middleware
    
  } catch (err) {
    // Token invalid or error
    res.status(400).json({ message: "Invalid Token", error: err.message });
  }
};

module.exports = verifyrestuToken;
