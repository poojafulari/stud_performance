// src/routes/performanceRoutes.js

const express = require("express");
const router = express.Router();
const performanceController = require("../controller/performanceController");

// View all
router.get("/", performanceController.getPerformances);

// Search
router.get("/search", performanceController.searchPerformance);

// Add
router.post("/add", performanceController.addPerformance);

// Update
router.put("/update/:id", performanceController.updatePerformance);

// Delete
router.delete("/delete/:id", performanceController.deletePerformance);

// Get performance for logged-in student
router.get("/student/:usr_id", performanceController.getPerformanceByStudent);


module.exports = router;
