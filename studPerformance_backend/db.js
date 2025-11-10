//db.js

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", 
  database: "student_performance"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit();
  }
  console.log("Connected to MySQL");
});

module.exports = db;
