const express = require("express");
const { addReview ,getReviews, editReview, deleteReview} = require("../controller/restaurantreviewsController");
const verifyToken = require("../middleware/userAuth");

const router = express.Router();

router.post("/add",verifyToken, addReview);
router.get("/:restaurantId", getReviews);
router.put("/:reviewId",  editReview);
router.delete("/:reviewId", deleteReview);

module.exports = router;
