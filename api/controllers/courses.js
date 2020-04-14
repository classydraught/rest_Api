const Course = require("../models/course");
const mongoose = require("mongoose");

exports.Courses_get_all = (req, res, next) => {
  Course.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.CreateCourse = (req, res, next) => {
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
};

exports.getCourse_one = (req, res, next) => {
  id = req.params.courseId;
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
};

exports.CourseUpdate = (req, res, next) => {
  const id = req.params.courseId;
  const updateOps = {};
  console.log(req.body);
  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }
  console.log(updateOps);

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
};

exports.deleteCourse = (req, res, next) => {
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
};

exports.deleteAll = (req, res, next) => {
  Course.deleteMany()
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
