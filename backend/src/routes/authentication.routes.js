const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authentication.controller")


router.post("/api/register",authenticationController.registerUser)
router.post("/api/login",authenticationController.loginUser)
router.get("/api/logout",authenticationController.logoutUser)


module.exports = router;
