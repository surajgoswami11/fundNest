const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fund",
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
