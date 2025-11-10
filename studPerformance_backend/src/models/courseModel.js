//src/models/courseModel.js

const db = require("../../db");

exports.createCourse = (c_name) => {
  const sql = "INSERT INTO course (c_name) VALUES (?)";
  return db.promise().execute(sql, [c_name]);
};

exports.fetchAllCourses = () => {
  const sql = "SELECT * FROM course";
  return db.promise().execute(sql).then(([rows]) => rows);
};

exports.getCourseById = (c_id) => {
  const sql = "SELECT * FROM course WHERE c_id = ?";
  return db.promise().execute(sql, [c_id])
    .then(([rows]) => rows.length > 0 ? rows[0] : null);
};

// ✅ Update Course
exports.updateCourse = (c_id, c_name) => {
  const sql = "UPDATE course SET c_name = ? WHERE c_id = ?";
  return db.promise().execute(sql, [c_name, c_id]);
};

// ✅ Delete Course
exports.deleteCourse = (c_id) => {
  const sql = "DELETE FROM course WHERE c_id = ?";
  return db.promise().execute(sql, [c_id]);
};

// Get courses allotted to a student
exports.getCoursesForStudent = (usr_id) => {
  const sql = `
    SELECT c.c_id, c.c_name
    FROM student s
    JOIN course c ON s.c_id = c.c_id
    WHERE s.usr_id = ?
  `;
  return db.promise().execute(sql, [usr_id])
    .then(([rows]) => rows);
};
