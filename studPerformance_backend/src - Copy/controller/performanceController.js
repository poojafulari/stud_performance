// src/controller/performanceController.js
const performanceModel = require("../models/performanceModel");
const db = require("../../db");

// Add Performance
exports.addPerformance = (req, res) => {
  const { stud_id, attend_per, machine_test, mcq_test, mock_score, date_of_exam } = req.body;

  if (!stud_id || !attend_per || !machine_test || !mcq_test || !mock_score || !date_of_exam) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  // calculate final score
  const final_score =
    (parseFloat(attend_per) +
      parseFloat(machine_test) +
      parseFloat(mcq_test) +
      parseFloat(mock_score)) / 4;

  performanceModel.createPerformance(
    stud_id,
    attend_per,
    machine_test,
    mcq_test,
    mock_score,
    final_score,
    date_of_exam,
    (err, result) => {
      if (err) {
        console.error("Error inserting performance:", err);
        return res.status(500).json({ success: false, message: "Error adding performance" });
      }
      res.status(201).json({ success: true, message: "Performance added successfully" });
    }
  );
};

// Update
exports.updatePerformance = (req, res) => {
  const id = req.params.id;
  const { attend_per, machine_test, mcq_test, mock_score, date_of_exam } = req.body;

  const final_score =
    (parseFloat(attend_per) +
      parseFloat(machine_test) +
      parseFloat(mcq_test) +
      parseFloat(mock_score)) / 4;

  performanceModel.updatePerformance(
    id,
    attend_per,
    machine_test,
    mcq_test,
    mock_score,
    final_score,
    date_of_exam,
    (err, result) => {
      if (err) {
        console.error("Error updating performance:", err);
        return res.status(500).json({ success: false, message: "Error updating performance" });
      }
      res.json({ success: true, message: "Performance updated successfully" });
    }
  );
};

// Get all
exports.getPerformances = (req, res) => {
  performanceModel.getPerformances((err, results) => {
    if (err) {
      console.error("Error fetching performances:", err);
      return res.status(500).json({ success: false, message: "Error fetching data" });
    }
    res.json({ success: true, data: results });
  });
};

// Search
exports.searchPerformance = (req, res) => {
  const { keyword } = req.query;
  performanceModel.searchPerformance(keyword, (err, results) => {
    if (err) {
      console.error("Error searching performances:", err);
      return res.status(500).json({ success: false, message: "Error searching" });
    }
    res.json({ success: true, data: results });
  });
};

// Delete
exports.deletePerformance = (req, res) => {
  performanceModel.deletePerformance(req.params.id, (err, result) => {
    if (err) {
      console.error("Error deleting performance:", err);
      return res.status(500).json({ success: false, message: "Error deleting" });
    }
    res.json({ success: true, message: "Performance deleted successfully" });
  });
};

// Get performance for a single student

exports.getPerformanceByStudent = (req, res) => {
  const { usr_id } = req.params;

  const sql = `
    SELECT p.*, s.stud_name
    FROM performance p
    JOIN student s ON p.stud_id = s.stud_id
    WHERE s.usr_id = ?
    ORDER BY date_of_exam DESC
  `;

  db.query(sql, [usr_id], (err, results) => {
    if (err) {
      console.error("Error fetching student performance:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    res.json({ success: true, data: results });
  });
};


