//src/controller/courseController.js

const courseModel = require("../models/courseModel");
const db = require("../../db"); // ✅ must include this

exports.addCourse = async (req, res) => {
  const { c_name } = req.body;

  if (!c_name) {
    return res.status(400).json({ success: false, message: "Course name is required" });
  }

  try {
    await courseModel.createCourse(c_name);
    res.status(201).json({ success: true, message: "Course added successfully" });
  } catch (err) {
    console.error("Error adding course:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.viewCourses = async (req, res) => {
  try {
    const courses = await courseModel.fetchAllCourses();
    res.status(200).json({ success: true, courses });
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  const { c_id } = req.params;
  const { c_name } = req.body;

  if (!c_name) return res.status(400).json({ success: false, message: "Course name is required" });

  try {
    await courseModel.updateCourse(c_id, c_name);
    res.json({ success: true, message: "Course updated successfully" });
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  const { c_id } = req.params;

  try {
    await courseModel.deleteCourse(c_id);
    res.json({ success: true, message: "Course deleted successfully" });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getStudentCourses = async (req, res) => {
  const { usr_id } = req.params;

  try {
    // First, check if student exists in student table
    const [studentRows] = await db.promise().execute(
      "SELECT * FROM student WHERE usr_id = ?",
      [usr_id]
    );

    if (studentRows.length > 0 && studentRows[0].c_id) {
      // Student has an allotted course
      const courses = await courseModel.getCoursesForStudent(usr_id);
      return res.status(200).json({ success: true, data: courses });
    } else {
      // Student is only a registered user, show all courses
      const courses = await courseModel.fetchAllCourses();
      return res.status(200).json({ success: true, data: courses });
    }
  } catch (err) {
    console.error("Error fetching student courses:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
