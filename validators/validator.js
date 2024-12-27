const { body, validationResult } = require("express-validator");

exports.UserValidator = [
  // Validate email
  body("email")
    .isEmail()
    .withMessage("Email không hợp lệ.")
    .notEmpty()
    .withMessage("Email không được để trống."),

  // Validate username
  body("username")
    .notEmpty()
    .withMessage("Tên đăng nhập đã được dùng.")
    .isLength({ min: 2 })
    .withMessage("Tên đăng nhập phải có ít nhất 2 ký tự."),

  // Validate password
  body("password")
    .notEmpty()
    .withMessage("Mật khẩu không được để trống.")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có ít nhất 6 ký tự."),

  // Validate password confirmation
  body("password_confirm")
    .notEmpty()
    .withMessage("Mật khẩu không được để trống.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Mật khẩu không khớp.");
      }
      return true;
    }),

  // Middleware xử lý lỗi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      return res.status(400).json({ error: firstError.msg });
    }
    next();
  },
];

exports.LoginValidator = [
  body("email")
    .isEmail()
    .withMessage("Email không hợp lệ.")
    .notEmpty()
    .withMessage("Email không được để trống."),

  body("password").notEmpty().withMessage("Mật khẩu không được để trống."),

  // Middleware xử lý lỗi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      return res.status(400).json({ error: firstError.msg });
    }
    next();
  },
];
