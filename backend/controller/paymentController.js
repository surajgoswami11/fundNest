const Payment = require("../models/paymentModel");
const razorpay = require("razorpay");
const crypto = require("crypto");
const createError = require("http-errors");
const razorpayInstance = require("../utils/paymentInstance");

exports.createPayment = async (req, res, next) => {
  try {
    const { campaignId, amount } = req.body;
    //
    const payment = await Payment.create({
      campaignId,
      amount,
      status: "created",
    });
    //
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `${payment.id}`,
    };
    //
    razorpayInstance.orders.create(options, async (error, order) => {
      if (error) {
        return next(
          createError(401, "Something went wrong while creating order.")
        );
      }
      payment.orderId = order;
      await payment.save();
      return res.status(200).json(order);
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    //
    secretKey = process.env.key_secret;

    //
    const hmaac = crypto.createHmac("sha256", secretKey);
    hmaac.update(razorpay_order_id + "|" + razorpay_payment_id);

    //
    const generateSignature = hmaac.digest("hex");
    //
    if (generateSignature === razorpay_signature) {
      const payment = await Payment.findOne({ orderId: razorpay_order_id });
      payment.paymentId = razorpay_payment_id;
      payment.status = "paid";

      await payment.save();
      res
        .status(200)
        .json({ success: true, message: "payment verify successfull" });
    } else {
      return next(createError(401, "Invalid signature! Payment not verified."));
    }
  } catch (error) {
    next(error);
  }
};
