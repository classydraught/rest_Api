const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ReviewControllers = require("../controllers/reviews");
router.get("/", ReviewControllers.reviews_get_all);

router.post("/", checkAuth, ReviewControllers.createReview);

router.get("/:reviewId", ReviewControllers.review_get_one);

router.patch("/:reviewId", checkAuth, ReviewControllers.patch_Review);

router.delete("/:reviewId", checkAuth, ReviewControllers.delete_review);

module.exports = router;
