const studentModel = require("../models/studentModel");

// Add student
exports.addStudent = async (req, res) => {
  try {
    const { usr_id, c_id } = req.body;
    const [result] = await studentModel.createStudentFromUser(usr_id, c_id);
    res.json({ success: true, message: "Student added successfully", studentId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// View all students
exports.viewStudents = async (req, res) => {
  try {
    const students = await studentModel.fetchAllStudents();
    res.json({ success: true, students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const { stud_id } = req.params;
    const { usr_id, c_id } = req.body;
    await studentModel.updateStudent(stud_id, usr_id, c_id);
    res.json({ success: true, message: "Student updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const { stud_id } = req.params;
    await studentModel.deleteStudent(stud_id);
    res.json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get student by email
exports.getStudentByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const student = await studentModel.getStudentByEmail(email);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get student by user id
exports.getStudentByUserId = async (req, res) => {
  try {
    const { usr_id } = req.params;
    const student = await studentModel.getStudentByUserId(usr_id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
