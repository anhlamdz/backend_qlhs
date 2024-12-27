const mongoose = require("mongoose");

exports.healthCheck = async (req, res) => {
  try {
    // Kiểm tra kết nối database
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: "Disconnected",
      1: "Connected",
      2: "Connecting",
      3: "Disconnecting",
    };

    res.status(200).json({
      success: true,
      message: "Health check successful",
      timestamp: new Date(),
      database: {
        state: dbStatus[dbState],
        status: dbState === 1 ? "healthy" : "unhealthy",
      },
      api: {
        status: "healthy",
        uptime: process.uptime(),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Health check failed",
      error: error.message,
    });
  }
};
