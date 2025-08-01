const User = require("../models/userModel");
const createError = require("http-errors");

//
exports.pendingKYC = async (req, res, next) => {
  try {
    const user = await User.find({ kycStatus: "pending" }).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

//
exports.resolve = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    user.kycStatus = "resolve";
    await user.save();

    res.status(200).json({ success: true, message: "KYC approved" });
  } catch (error) {
    next(error);
  }
};

//
exports.reject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    user.kycStatus = "reject";
    await user.save();

    res.status(200).json({ success: true, message: "KYC rejected" });
  } catch (error) {
    next(error);
  }
};
