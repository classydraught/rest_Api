const Review = require("../models/review");
const Course = require("../models/course");
const mongoose = require("mongoose");

exports.reviews_get_all = (req, res, next) => {
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
};
exports.createReview = (req, res, next) => {
  console.log(req.body);
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
          res.status(201).json({ result });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => res.status(500).json({ message: "course not found" }));
};
exports.review_get_one = (req, res, next) => {
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
};

exports.delete_review = (req, res, next) => {
  Review.remove({ _id: req.params.reviewId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Review deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/reviews",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.patch_Review = (req, res, next) => {
  res.status(200).json({
    message: "Updated Review!",
  });
};
exports.deleteAll = (req, res, next) => {
  Review.deleteMany()
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
