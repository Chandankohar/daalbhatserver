const RestaurantReview = require("../model/restaurantReviews");

// ✅ Add a review
exports.addReview = async (req, res) => {
  try {
    const { restaurantId, rating, comment } = req.body;
    console.log(req.body)

    const userId = req.user._id; // User ID from token
    const newReview = new RestaurantReview({ restaurantId, userId, rating, comment });
    await newReview.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ error: "Failed to add review" });
  }
};

// ✅ Get all reviews for a restaurant
exports.getReviews = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    const reviews = await RestaurantReview.find({ restaurantId }).populate("userId", "name")

    res.status(200).json({  reviews });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// ✅ Edit a review (Only by the user who wrote it)
exports.editReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;
    const { rating, comment } = req.body;

    const review = await RestaurantReview.findOne({ _id: reviewId, userId });

    if (!review) {
      return res.status(403).json({ error: "Unauthorized to edit this review" });
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ error: "Failed to update review" });
  }
};

// ✅ Delete a review (Only by the user who wrote it)
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await RestaurantReview.findOne({ _id: reviewId, userId });

    if (!review) {
      return res.status(403).json({ error: "Unauthorized to delete this review" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review" });
  }
};
