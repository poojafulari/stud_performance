// src/controller/userController.js

const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

// Add new user
exports.addUser = (req, res) => {
  const { usr_name, email, contact, password, role } = req.body;

  // Hash password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({
        success: false,
        message: "Error hashing password",
      });
    }

    // Insert into DB
    userModel.createUser(usr_name, email, contact, hashedPassword, role, (err) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      res.json({
        success: true,
        message: "User added successfully",
      });
    });
  });
};

// View all users
exports.viewUser = (req, res) => {
  userModel.getAllUser((err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    res.json({ success: true, users: results }); // renamed key to 'users'
  });
};

// View only student users
exports.viewStudentUser = (req, res) => {
  userModel.getStudentUser((err, results) => {
    if (err) {
      console.error("Error fetching student users:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    res.json({ success: true, users: results }); // renamed key to 'users'
  });
};

// View single user by email
exports.viewUserByEmail = (req, res) => {
  const { email } = req.params;
  userModel.findUserByEmail(email, (err, result) => {
    if (err) {
      console.error("Error fetching user by email:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    if (!result) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user: result });
  });
};
