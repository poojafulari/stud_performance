// src/routes/courseRoutes.js

const express = require("express");
const router = express.Router();
const courseController = require("../controller/courseController");

// Admin can add/update/delete courses
router.post("/addcourse", courseController.addCourse);
router.put("/updatecourse/:c_id", courseController.updateCourse);
router.delete("/deletecourse/:c_id", courseController.deleteCourse);

// Anyone (student/admin/guest) can view courses
router.get("/viewcourse", courseController.viewCourses);

// Get courses assigned to a student OR all courses if not allotted
router.get("/student/:usr_id", courseController.getStudentCourses);


module.exports = router;
