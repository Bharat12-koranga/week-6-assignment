const express = require("express");
const { body } = require("express-validator");

const { register, login } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const authLimiter = require("../middleware/rateLimiter");

const router = express.Router();

// Register
router.post(
  "/register",
  authLimiter,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  register
);

// Login
router.post(
  "/login",
  authLimiter,
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

// Protected Route
router.get("/profile", auth, (req, res) => {
  res.json({
    message: "Welcome! This is a protected route.",
    user: req.user,
  });
});

module.exports = router;