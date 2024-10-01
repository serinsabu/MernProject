/* In Express.js, express.Router() is a mini Express application without all the server configurations but 
with the ability to define routes, middleware, and even have its own set of route handlers. It allows you to modularize
your routes and middkeware to keep your code organized and maintainable

Use the express.Router class to create modular, maintainable route handlers. A Router instance is a complete middleware and 
routing system. for this reasons, it is often referred as mini app
*/

const express = require("express");
const router = express.Router();
// const { home, register } = require("../controllers/auth-controller");
//or
const authControllers = require("../controllers/auth-controller");
const adminController = require("../controllers/admin-controller");
const authValidators = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

// router.get("/", (req, res) => {
//   res.status(200).send("Hello my name is SERIN SABU using Router");
// });

//or

// router.route("/").get(home);
// router.route("/register").get(register);

// instead of writing just home you can pass it from authcontrollers
router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validate(authValidators.signupSchema), authControllers.register); //here validate is middleware, checks for validation only then it goes to register api
router
  .route("/login")
  .post(validate(authValidators.loginSchema), authControllers.login);
router.route("/user").get(authMiddleware, authControllers.user);

// export , otherwise app wont run
module.exports = router;
