const mongoose = require("mongoose");

const menuReviewSchema = new mongoose.Schema(
  {
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);


async function updateMenuRating(menuId) {
  const result = await mongoose.model("MenuReview").aggregate([
    { $match: { menuId: new mongoose.Types.ObjectId(menuId) } },
    { $group: { _id: "$menuId", averageRating: { $avg: "$rating" } } }
  ]);

  const newRating = result.length > 0 ? result[0].averageRating.toFixed(1) : "0";

  await mongoose.model("Menu").findByIdAndUpdate(menuId, { rating: newRating });
}

// After saving a review, update menu rating
menuReviewSchema.post("save", async function () {
  await updateMenuRating(this.menuId);
});

// After deleting a review, update menu rating
menuReviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await updateMenuRating(doc.menuId);
  }
});
module.exports = mongoose.model("MenuReview", menuReviewSchema);
