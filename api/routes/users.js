const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");
const CheckAuth = require("../middleware/check-auth");
router.post("/signup", UserController.CreateUser);

router.post("/login", UserController.UserLogin);

router.delete("/:userId", CheckAuth, UserController.deleteUser);

module.exports = router;
