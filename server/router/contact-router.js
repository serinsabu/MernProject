const express = require("express");
const router = express.Router();
const contactForm = require("../controllers/contact-controller");
const validate = require("../middlewares/validate-middleware");
const contactValidator = require("../validators/contact-validator");

router.route("/contact").post(validate(contactValidator), contactForm);

module.exports = router;
