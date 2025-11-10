//src/routes/authroute.js

const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// Register User
router.post("/register", authController.registerUser);

// Login User
router.post("/login", authController.loginUser);

// Check Auth (token validation)
router.get("/check", authController.checkAuth);

module.exports = router;
