const mongoose = require("mongoose");

const restaurantReviewSchema = new mongoose.Schema(
  {
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

async function updateRestaurantRating(restaurantId) {
    const result = await mongoose.model("RestaurantReview").aggregate([
      { $match: { restaurantId: new mongoose.Types.ObjectId(restaurantId) } },
      { $group: { _id: "$restaurantId", averageRating: { $avg: "$rating" } } }
    ]);
  
    const newRating = result.length > 0 ? result[0].averageRating.toFixed(1) : "0";
  
    await mongoose.model("Restaurant").findByIdAndUpdate(restaurantId, { rating: newRating });
  }
  
  // After saving a review, update menu rating
  restaurantReviewSchema.post("save", async function () {
    await updateRestaurantRating(this.restaurantId);
  });
  
  // After deleting a review, update menu rating
  restaurantReviewSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
      await updateRestaurantRating(doc.restaurantId);
    }
  });

module.exports = mongoose.model("RestaurantReview", restaurantReviewSchema);
