const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const EnquiryControllers = require("../controllers/enquiry");
router.get("/", EnquiryControllers.GetAllEnquiry);

router.post("/", EnquiryControllers.CreateEnquiry);

router.get("/:enquiryId", EnquiryControllers.getEnquiry_one);

router.patch("/:enquiryId", checkAuth, EnquiryControllers.EnquiryUpdate);

router.delete("/:enquiryId", checkAuth, EnquiryControllers.deleteEnquiry);
router.delete("/", checkAuth, EnquiryControllers.deleteEnquiry);

module.exports = router;
