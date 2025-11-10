// src/routes/predictionRoutes.js

const express = require("express");
const router = express.Router();
const predictionController = require("../controller/predictionController");

// Generate predictions from performance
router.post("/generate", predictionController.generatePredictions);

// Get all predictions
router.get("/", predictionController.getPredictions);

// Get prediction for a specific student
router.get("/student/:id", predictionController.getPredictionByStudent);


module.exports = router;
