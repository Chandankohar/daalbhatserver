const express = require("express");
const { addReview, getReviews, editReview, deleteReview } = require("../controller/menureviewsController");
const verifyToken = require("../middleware/userAuth");

const router = express.Router();

router.post("/add",verifyToken, addReview);
router.get("/:menuId", getReviews);
router.put("/:reviewId",  editReview);
router.delete("/:reviewId", deleteReview);

module.exports = router;
