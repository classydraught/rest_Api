const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const PromotionControllers = require("../controllers/promotions");
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

router.get("/", PromotionControllers.Promotions_get_all);

router.post(
  "/",
  checkAuth,
  upload.single("promotionImage"),
  PromotionControllers.CreatePromotion
);

router.get("/:promotionId", PromotionControllers.getPromotion_one);

router.patch("/:promotionId", checkAuth, PromotionControllers.PromotionUpdate);

router.delete("/:promotionId", checkAuth, PromotionControllers.deletePromotion);
router.delete("/", PromotionControllers.deleteAll);

module.exports = router;
