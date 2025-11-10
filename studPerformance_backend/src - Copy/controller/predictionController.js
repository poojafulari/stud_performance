// src/controller/predictionController.js

const db = require("../../db");
const predictionModel = require("../models/predictionModel");

// Generate predictions from performance table
exports.generatePredictions = (req, res) => {
  const sql = `SELECT stud_id, final_score FROM performance`;
  db.query(sql, (err, performances) => {
    if (err) {
      console.error("Error fetching performance:", err);
      return res.status(500).json({ success: false, message: "Error fetching performance" });
    }

    performances.forEach((perf) => {
      const readiness_level = perf.final_score >= 75 ? "Ready for Next Level" : "Needs Improvement";
      const shortlisted = perf.final_score >= 75 ? 1 : 0;

      predictionModel.savePrediction(perf.stud_id, readiness_level, shortlisted, (err2) => {
        if (err2) console.error("Error saving prediction:", err2);
      });
    });

    res.json({ success: true, message: "Predictions generated successfully" });
  });
};

// View all predictions
exports.getPredictions = (req, res) => {
  predictionModel.getPredictions((err, results) => {
    if (err) {
      console.error("Error fetching predictions:", err);
      return res.status(500).json({ success: false, message: "Error fetching predictions" });
    }
    res.json({ success: true, data: results });
  });
};

// Get latest prediction for a single student
exports.getPredictionByStudent = (req, res) => {
  const stud_id = req.params.id;

  const sql = `
    SELECT pr.*, s.stud_name
    FROM prediction pr
    JOIN student s ON pr.stud_id = s.stud_id
    WHERE pr.stud_id = ?
    ORDER BY pr.created_at DESC
    LIMIT 1
  `;

  db.query(sql, [stud_id], (err, results) => {
    if (err) {
      console.error("Error fetching student prediction:", err);
      return res.status(500).json({ success: false, message: "Error fetching prediction" });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Prediction not found" });
    }

    res.json({ success: true, data: results[0] });
  });
};
