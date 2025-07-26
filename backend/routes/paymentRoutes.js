const express = require("express");
const {
  createPayment,
  verifyPayment,
} = require("../controller/paymentController");

const router = express.Router();

router.post("/create-payment", createPayment);
router.post("/verify-payment", verifyPayment);
module.exports = router;
