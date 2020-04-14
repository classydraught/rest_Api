const express = require("express");
const router = express.Router();
const multer = require("multer");

const UserController = require("../controllers/users");
const CheckAuth = require("../middleware/check-auth");
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

router.post(
  "/signup",
  upload.single("profileImage"),
  UserController.CreateUser
);

router.post("/login", UserController.UserLogin);

router.delete("/:userId", CheckAuth, UserController.deleteUser);
router.delete("/", CheckAuth, UserController.deleteAll);
router.post("/addCourse", CheckAuth, UserController.addCoursetoUser);

module.exports = router;
