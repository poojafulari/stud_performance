// src/models/predictionModel.js

const db = require("../../db");

// Save or Update Prediction
exports.savePrediction = (stud_id, readiness_level, shortlisted, callback) => {
  const sql = `
    INSERT INTO prediction (stud_id, readiness_level, shortlisted)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      readiness_level = VALUES(readiness_level),
      shortlisted = VALUES(shortlisted)
  `;
  db.query(sql, [stud_id, readiness_level, shortlisted], callback);
};

// Get All Predictions with student info
exports.getPredictions = (callback) => {
  const sql = `
    SELECT pr.*, s.stud_name 
    FROM prediction pr 
    JOIN student s ON pr.stud_id = s.stud_id
  `;
  db.query(sql, callback);
};
