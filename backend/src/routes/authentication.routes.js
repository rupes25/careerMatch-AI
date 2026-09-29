const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authentication.controller");
const authenticateUser = require("../middlewares/authentication.middleware");

router.post("/register", authenticationController.registerUser);
router.post("/login", authenticationController.loginUser);
router.get("/logout", authenticationController.logoutUser);
router.get("/currentUser", authenticateUser, authenticationController.currentUser);

module.exports = router;
