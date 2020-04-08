const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const CourseControllers = require("../controllers/courses");
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

router.get("/", CourseControllers.Courses_get_all);

router.post(
  "/",
  checkAuth,
  upload.single("courseImage"),
  CourseControllers.CreateCourse
);

router.get("/:courseId", CourseControllers.getCourse_one);

router.patch("/:courseId", checkAuth, CourseControllers.CourseUpdate);

router.delete("/:courseId", checkAuth, CourseControllers.deleteCourse);
router.delete("/", CourseControllers.deleteAll);

module.exports = router;
