const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authentication.controller");
const authenticateUser = require("../middlewares/authentication.middleware");


router.post("/api/register",authenticationController.registerUser)
router.post("/api/login",authenticationController.loginUser)
router.get("/api/logout",authenticationController.logoutUser)
router.get("/api/currentUser", authenticateUser, authenticationController.currentUser)


module.exports = router;
