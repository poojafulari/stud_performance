// src/models/userModel.js

const db = require("../../db");

// Create new user
exports.createUser = (usr_name, email, contact, password, role, callback) => {
  const sql = "INSERT INTO user (usr_name, email, contact, password, role) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [usr_name, email, contact, password, role], callback);
};

// Get all users
exports.getAllUser = (callback) => {
  const sql = "SELECT usr_id, usr_name, email, contact, role FROM user";
  db.query(sql, callback);
};

// Get only student users
exports.getStudentUser = (callback) => {
  const sql = "SELECT usr_id, usr_name, email, contact FROM user WHERE role = 'student'";
  db.query(sql, callback);
};

// Find user by email
exports.findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0] || null);
  });
};
