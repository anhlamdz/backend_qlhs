const Student = require("../models/studentModel");

// Thêm học sinh mới
exports.createStudent = async (req, res) => {
  try {
    const student = new Student({
      name: req.body.name,
      createdBy: req.user.userId,
    });
    await student.save();

    res.status(201).json({
      success: true,
      message: "Thêm học sinh thành công",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Lấy danh sách học sinh
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({ createdBy: req.user.userId }).select(
      "name createdAt updatedAt"
    );

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Cập nhật tên học sinh
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      { name: req.body.name },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        error: "Không tìm thấy học sinh",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Xóa học sinh
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        error: "Không tìm thấy học sinh",
      });
    }

    res.status(200).json({
      success: true,
      message: "Xóa học sinh thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
