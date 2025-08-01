const User = require("../models/userModel");
const KYC = require("../models/kycModels");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const createError = require("http-errors");

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return createError(404, "User not found");
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.find({ role: "user" }).select("-password");

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

exports.uploadKyc = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const {
      accountHolderName,
      bankName,
      IFSC,
      accountNo,
      panNo,
      aadharNo,
      branchName,
    } = req.body;

    if (
      !req.files ||
      !req.files.passbookImage ||
      !req.files.aadharImage ||
      !req.files.panImage
    ) {
      return next(createError(404, "Please upload documents"));
    }

    const passbookImage = await uploadOnCloudinary(
      req.files.passbookImage[0].buffer
    );
    const aadharImage = await uploadOnCloudinary(
      req.files.aadharImage[0].buffer
    );
    const panImage = await uploadOnCloudinary(req.files.panImage[0].buffer);

    const kycData = await KYC.create({
      user: userId,
      accountHolderName,
      bankName,
      IFSC,
      accountNo,
      panNo,
      aadharNo,
      branchName,
      passbookImage: passbookImage.secure_url,
      aadharImage: aadharImage.secure_url,
      panImage: panImage.secure_url,
    });

    await User.findByIdAndUpdate(userId, { kycStatus: "pending" });

    res.status(201).json({
      success: true,
      message: "KYC uploaded successfully",
      kyc: kycData,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { contactNumber, userName } = req.body;

    const updateFile = {
      contactNumber,
      userName,
    };

    if (req.file) {
      const profilePic = await uploadOnCloudinary(req.file.buffer);
      updateFile.profilePic = profilePic.secure_url;
    }

    const updateUser = await User.findByIdAndUpdate(id, updateFile, {
      new: true,
    });
    if (!updateUser) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json({ success: true, user: updateUser });
  } catch (error) {
    next(error);
  }
};

//
exports.deleteuser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return next(createError(404, "User Not Found"));
    }

    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (error) {
    next(error);
  }
};
