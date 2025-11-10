const db = require("../../db");

// Add student from user table
exports.createStudentFromUser = (usr_id, c_id) => {
  const sql = `
    INSERT INTO student (stud_name, email, contact, usr_id, c_id)
    SELECT u.usr_name, u.email, u.contact, u.usr_id, ?
    FROM user u
    WHERE u.usr_id = ?
  `;
  return db.promise().execute(sql, [c_id, usr_id]);
};

// Fetch all students
exports.fetchAllStudents = () => {
  const sql = `
    SELECT s.stud_id, s.stud_name, s.email, s.contact, s.usr_id, s.c_id, c.c_name
    FROM student s
    LEFT JOIN course c ON s.c_id = c.c_id
  `;
  return db.promise().execute(sql).then(([rows]) => rows);
};

// Update student
exports.updateStudent = (stud_id, usr_id, c_id) => {
  const sql = `UPDATE student SET usr_id = ?, c_id = ? WHERE stud_id = ?`;
  return db.promise().execute(sql, [usr_id, c_id, stud_id]);
};

// Delete student
exports.deleteStudent = (stud_id) => {
  const sql = "DELETE FROM student WHERE stud_id = ?";
  return db.promise().execute(sql, [stud_id]);
};

// Get student by email
exports.getStudentByEmail = (email) => {
  const sql = `
    SELECT s.stud_id, s.stud_name, s.email, s.contact, s.usr_id, s.c_id, c.c_name
    FROM student s
    LEFT JOIN course c ON s.c_id = c.c_id
    WHERE s.email = ?
  `;
  return db.promise().execute(sql, [email]).then(([rows]) => rows[0] || null);
};

// Get student by user id
exports.getStudentByUserId = (usr_id) => {
  const sql = `
    SELECT s.stud_id, s.stud_name, s.email, s.contact, s.usr_id, s.c_id, c.c_name
    FROM student s
    LEFT JOIN course c ON s.c_id = c.c_id
    WHERE s.usr_id = ?
  `;
  return db.promise().execute(sql, [usr_id]).then(([rows]) => rows[0] || null);
};
