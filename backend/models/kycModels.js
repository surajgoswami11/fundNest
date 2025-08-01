const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    accountHolderName: {
      type: String,
      required: true,
      trim: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    IFSC: {
      type: String,
      required: true,
      trim: true,
    },
    accountNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    branchName: {
      type: String,
      trim: true,
    },
    panNo: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Please provide correct PAN Number"],
      maxlength: [12, "Please provide correct PAN Number"],
    },
    aadharNo: {
      type: String,
      required: true,
      trim: true,
      minlength: [12, "Please provide correct PAN Number"],
      maxlength: [12, "Please provide correct PAN Number"],
    },
    passbookImage: {
      type: String,
      required: true,
    },
    aadharImage: {
      type: String,
      required: true,
    },
    panImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("KYC", kycSchema);
