const jwt = require("jsonwebtoken");

exports.authenticateToken = async (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Vui lòng đăng nhập",
      });
    }

    // Xác thực token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          error: "Token không hợp lệ hoặc đã hết hạn",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Xác thực không thành công",
    });
  }
};
