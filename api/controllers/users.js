const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Course = require("../models/course");

exports.CreateUser = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "User mailid exists" });
      } else {
        bcrypyt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              image: req.file.path,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "user created",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  result: err,
                  message: "user creation failed",
                });
              });
          }
        });
      }
    });
};

exports.UserLogin = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypyt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          console.log(user[0]._id);
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth succeded",
            id: user[0]._id,
            name: user[0].name,
            email: user[0].email,
            image: user[0].image,
            courses: user[0].courses,
            token: token,
          });
        } else {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.addCoursetoUser = (req, res, next) => {
  const id = req.body.userId;
  const courseId = req.body.courseId;
  Course.findById(courseId)
    .then(() => {
      User.findById(id)
        .then((records) => {
          return records.courses.includes(courseId);
        })
        .then((exists) => {
          if (!exists) {
            User.update(
              { _id: id },
              { $push: { courses: courseId } }
            ).then((response) => res.status(200).json(response));
          } else {
            res.status(409).json({ message: "Course already purchased" });
          }
        })
        .catch((err) => {
          res.status(404).json({ error: err, message: "User not found" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: err, message: "Course isn't added" });
    });
};

exports.deleteUser = (req, res, next) => {
  User.find({ _id: req.params.userId })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      User.deleteOne({ _id: req.params.userId })
        .exec()
        .then((result) => {
          res.status(200).json({
            message: "User deleted",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ result: err, message: "Failed deleting" });
        });
    }
    )
};

exports.deleteAll = (req, res, next) => {
  User.deleteMany()
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
