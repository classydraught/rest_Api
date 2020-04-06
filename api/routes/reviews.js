const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = require("../models/review");
const Course = require("../models/course");
router.get("/", (req, res, next) => {
  Review.find()
    // .populate("courseId")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res, next) => {
  Course.findById(req.body.courseId)
    .then((course) => {
      const review = new Review({
        _id: mongoose.Types.ObjectId(),
        courseId: req.body.courseId,
        value: req.body.value,
        comment: req.body.comment,
        author: req.body.author,
        date: req.body.date,
      });
      review
        .save()
        .then((result) => {
          console.log(result);
          res.status(201).json(result);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => res.status(500).json({ message: "course not found" }));
});

router.get("/:reviewId", (req, res, next) => {
  Review.findById(req.params.reviewId)
    .exec()
    .then((review) => {
      if (!review) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
      res.status(200).json({
        review: review,
        request: {
          type: "GET",
          url: "http://localhost:3000/reviews",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:reviewId", (req, res, next) => {
  res.status(200).json({
    message: "Updated Review!",
  });
});

router.delete("/:reviewId", (req, res, next) => {
  Review.remove({ _id: req.params.reviewId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Review deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
