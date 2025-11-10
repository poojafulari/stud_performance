const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

// Admin only
router.post("/add", studentController.addStudent);
router.put("/update/:stud_id", studentController.updateStudent);
router.delete("/delete/:stud_id", studentController.deleteStudent);
router.get("/all", studentController.viewStudents);

// Student/Admin
router.get("/email/:email", studentController.getStudentByEmail);
router.get("/user/:usr_id", studentController.getStudentByUserId);

module.exports = router;
