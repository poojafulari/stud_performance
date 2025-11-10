// src/routes/userRoute.js

const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// Add user
router.post("/adduser", userController.addUser);

// View all users
router.get("/viewuser", userController.viewUser);

// View only student users
router.get("/viewstudentuser", userController.viewStudentUser);

// View single user by email
router.get("/viewuser/:email", userController.viewUserByEmail);

module.exports = router;
