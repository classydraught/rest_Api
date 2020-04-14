const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const MemberControllers = require("../controllers/members");

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
router.get("/", MemberControllers.GetAllMembers);
router.post(
  "/",
  checkAuth,
  upload.single("memberImage"),
  MemberControllers.CreateMember
);

router.get("/:memberId", MemberControllers.getMember_one);

router.patch("/:memberId", checkAuth, MemberControllers.MemberUpdate);

router.delete("/:memberId", checkAuth, MemberControllers.deleteMemberId);
router.delete("/", checkAuth, MemberControllers.deleteAll);

module.exports = router;
