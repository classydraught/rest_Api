const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /reviews",
  });
});

router.post("/", (req, res, next) => {
  const review = {
    courseId: req.body.courseId,
    value: req.body.value,
    comment: req.body.comment,
    author: req.body.author,
    date: req.body.date,
  };
  res.status(201).json({
    message: "review was created",
    review: review,
  });
});

router.get("/:reviewsId", (req, res, next) => {
  const id = req.params.courseId;
  if (id === "special") {
    res.status(200).json({
      message: "You discovered the special ID",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You passed an ID",
    });
  }
});

router.patch("/:reviewsId", (req, res, next) => {
  res.status(200).json({
    message: "Updated product!",
  });
});

router.delete("/:reviewsId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted product!",
  });
});

module.exports = router;
