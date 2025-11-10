//src/app.js

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const courseRoutes = require("./routes/courseRoute");
const studentRoutes = require("./routes/studentRoute");
const performanceRoutes = require("./routes/performanceRoute"); 
const predictionRoutes = require("./routes/predictionRoute");


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/performance", performanceRoutes); 
app.use("/api/prediction", predictionRoutes); 

module.exports = app;
