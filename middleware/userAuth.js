const jwt = require("jsonwebtoken");
const User = require("../model/user"); // Assuming you have a User model in the 'models' folder

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  
  // If no token is provided
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to the request
    req.user = verified;

    // Verify user exists in the database
    const user = await User.findById(verified._id); // assuming `_id` is stored in the token

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user is found, proceed to next middleware
    next();
  } catch (err) {
    // Token invalid or error
    res.status(400).json({ message: "Invalid Token", error: err.message });
  }
};

module.exports = verifyToken;
