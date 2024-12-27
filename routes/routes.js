const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/userControllers");
const { UserValidator, LoginValidator } = require("../validators/validator");
const { authenticateToken } = require("../middleware/auth");
const studentController = require("../controllers/studentController");
const { healthCheck } = require("../controllers/healthController");

// Auth routes
router.post("/register", UserValidator, register);
router.post("/login", LoginValidator, login);
router.post("/logout", authenticateToken, logout);

// Student routes
router.post("/students", authenticateToken, studentController.createStudent);
router.get("/students", authenticateToken, studentController.getStudents);
router.put("/students/:id", authenticateToken, studentController.updateStudent);
router.delete(
  "/students/:id",
  authenticateToken,
  studentController.deleteStudent
);

// Health check route
router.get("/health-check", healthCheck);

module.exports = router;
