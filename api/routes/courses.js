const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Course = require("../models/course");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/", (req, res, next) => {
  Course.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs,
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", checkAuth, upload.single("courseImage"), (req, res, next) => {
  console.log(req.file);
  const course = new Course({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    category: req.body.category,
    image: req.file.path,
    price: req.body.price,
    featured: req.body.featured,
    description: req.body.description,
  });
  course
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:coursesId", (req, res, next) => {
  const id = req.params.courseId;
  Course.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:courseId", checkAuth, (req, res, next) => {
  const id = req.params.courseId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Course.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Course updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:courseId", checkAuth, (req, res, next) => {
  const id = req.params.courseId;
  Course.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
