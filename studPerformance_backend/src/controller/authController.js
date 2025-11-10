// src/controller/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authModel = require("../models/authModel");
const db = require("../../db");

const JWT_SECRET = "psf559";

// User Registration
exports.registerUser = async (req, res) => {
  const { usr_name, email, contact, password, role } = req.body;

  if (!usr_name || !email || !contact || !password) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  try {
    const existingUser = await authModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserId = await authModel.createUser(
      usr_name,
      email,
      contact,
      hashedPassword,
      role || "student"
    );

    res.status(201).json({ success: true, message: "User registered", usr_id: newUserId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }

  try {
    const user = await authModel.findUserByEmail(email);
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { usr_id: user.usr_id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Default payload
    let responsePayload = {
      success: true,
      message: "Login successful",
      token,
      usr_id: user.usr_id,
      usr_name: user.usr_name,
      role: user.role,
      stud_id: null, // default null
    };

    // If student, fetch stud_id
    if (user.role.toLowerCase() === "student") {
      const student = await authModel.findStudentByUserId(user.usr_id);
      if (student) {
        responsePayload.stud_id = student.stud_id;
      }
    }

    res.json(responsePayload);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Check Authentication
exports.checkAuth = (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.json({ isLoggedIn: false, role: null });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({
      isLoggedIn: true,
      usr_id: decoded.usr_id,
      role: decoded.role,
      email: decoded.email
    });
  } catch (err) {
    return res.json({ isLoggedIn: false, role: null });
  }
};
