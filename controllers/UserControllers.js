const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Sử dụng .exec() để chuyển sang Promise
    const existingUser = await User.findOne({ email }).exec();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email đã được sử dụng.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Đăng ký thành công",
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      error: "Đã xảy ra lỗi khi đăng ký",
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Kiểm tra JWT_SECRET
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const { email, password } = req.body;

    // Tìm user theo email
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Email hoặc mật khẩu không đúng",
      });
    }

    // Kiểm tra password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Email hoặc mật khẩu không đúng",
      });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Đã xảy ra lỗi khi đăng nhập",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    // Có thể thêm logic để lưu token vào blacklist nếu cần
    res.status(200).json({
      success: true,
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      error: "Đã xảy ra lỗi khi đăng xuất",
    });
  }
};
