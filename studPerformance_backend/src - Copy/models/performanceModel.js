// src/models/performanceModel.js
const db = require("../../db");

// Create Performance
exports.createPerformance = (
  stud_id,
  attend_per,
  machine_test,
  mcq_test,
  mock_score,
  final_score,
  date_of_exam,
  callback
) => {
  const sql = `
    INSERT INTO performance 
      (stud_id, attend_per, machine_test, mcq_test, mock_score, final_score, date_of_exam)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [stud_id, attend_per, machine_test, mcq_test, mock_score, final_score, date_of_exam],
    callback
  );
};

// Update Performance
exports.updatePerformance = (
  id,
  attend_per,
  machine_test,
  mcq_test,
  mock_score,
  final_score,
  date_of_exam,
  callback
) => {
  const sql = `
    UPDATE performance 
    SET attend_per=?, machine_test=?, mcq_test=?, mock_score=?, final_score=?, date_of_exam=? 
    WHERE per_id=?
  `;
  db.query(
    sql,
    [attend_per, machine_test, mcq_test, mock_score, final_score, date_of_exam, id],
    callback
  );
};

// Get All Performances (with student name join)
exports.getPerformances = (callback) => {
  const sql = `
    SELECT p.*, s.stud_name 
    FROM performance p 
    JOIN student s ON p.stud_id = s.stud_id
  `;
  db.query(sql, callback);
};

// Search by student name
exports.searchPerformance = (keyword, callback) => {
  const sql = `
    SELECT p.*, s.stud_name 
    FROM performance p 
    JOIN student s ON p.stud_id = s.stud_id
    WHERE s.stud_name LIKE ?
  `;
  db.query(sql, [`%${keyword}%`], callback);
};

// Delete
exports.deletePerformance = (id, callback) => {
  const sql = `DELETE FROM performance WHERE per_id=?`;
  db.query(sql, [id], callback);
};
