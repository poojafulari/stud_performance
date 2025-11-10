// src/models/authModel.js

const db = require("../../db");

// Find user by email
exports.findUserByEmail = async (email) => {
  try {
    const [rows] = await db.promise().execute(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
};

// Register new user
exports.createUser = async (usr_name, email, contact, hashedPassword, role) => {
  try {
    const [result] = await db.promise().execute(
      "INSERT INTO user (usr_name, email, contact, password, role) VALUES (?, ?, ?, ?, ?)",
      [usr_name, email, contact, hashedPassword, role]
    );
    return result.insertId;
  } catch (err) {
    throw err;
  }
};


exports.findStudentByUserId = (usr_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM student WHERE usr_id = ?";
    db.query(sql, [usr_id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
};

