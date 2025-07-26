const User = require("../models/userModel");
const Fund = require("../models/fundModel");
const createError = require("http-errors");
const { uploadOnCloudinary } = require("../utils/cloudinary");

// create
exports.createFund = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, description, totalAmmount, message } = req.body;

    //
    if (!title || !description || !totalAmmount || !message) {
      return next(createError(404, "Please fill all feild"));
    }
    //
    let imageUrls = [];

    if (req.files) {
      for (const file of req.files) {
        const uploadedImages = await uploadOnCloudinary(file.buffer);
        if (uploadedImages?.secure_url)
          imageUrls.push(uploadedImages?.secure_url);
      }
    }
    //
    const newFund = await Fund.create({
      user: userId,
      title,
      description,
      totalAmmount,
      images: imageUrls,
    });
    res.status(200).json({
      success: true,
      message: "your campaign create successfully",
      fund: newFund,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllFund = async (req, res, next) => {
  try {
    const allFund = await Fund.find().populate("user");

    res.status(200).json({ success: true, allFund });
  } catch (error) {
    next(error);
  }
};

exports.getFundById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const campaign = await Fund.findById(id).populate("user");

    if (!campaign) {
      return next(createError(404, "campaign not found"));
    }

    res.status(200).json({ success: true, campaign });
  } catch (error) {
    next(error);
  }
};

exports.updateFund = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, totalAmmount, message } = req.body;

    if (!title || !description || !totalAmmount || !message) {
      return next(createError(404, "Please fill all feild"));
    }

    let imageUrl = [];

    if (req.files) {
      for (const file of req.files) {
        const updateImage = await uploadOnCloudinary(file.buffer);
        if (updateImage?.secure_url) {
          imageUrl.push(updateImage?.secure_url);
        }
      }
    }
    const updateFund = await Fund.findByIdAndUpdate(
      id,
      {
        title,
        description,
        totalAmmount,
        message,
        images: imageUrl,
      },
      { new: true }
    );
    if (!updateFund) {
      return next(createError(404, "Fund not found"));
    }

    res.status(200).json({
      success: true,
      message: "Campaign updated successfully",
      fund: updateFund,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteFund = async (req, res, next) => {
  try {
    const { id } = req.params;

    const campaign = await Fund.findByIdAndDelete(id);

    if (!campaign) {
      return next(createError(404, "Campaign not found"));
    }
    res
      .status(200)
      .json({ success: true, message: "Your Campaign deleted successfully" });
  } catch (error) {
    next(error);
  }
};
