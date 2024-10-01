const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware"); // compare with token and check if user is valid
const adminMiddleware = require("../middlewares/admin-middleware"); //to check if user is admin or not

router
  .route("/getAllUsers")
  .get(authMiddleware, adminMiddleware, adminController.getUsers);

router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);

router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateUserById);

router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteContactById);
router
  .route("/getAllContacts")
  .get(authMiddleware, adminMiddleware, adminController.getContacts);
module.exports = router;
