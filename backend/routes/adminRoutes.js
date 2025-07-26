const express = require("express");

const { protectRoutes } = require("../middlewares/authMiddleware");
const {
  pendingKYC,
  resolve,
  reject,
} = require("../controller/adminController");

const router = express.Router();

router.get("kyc/pending-kyc", protectRoutes, pendingKYC);
router.put("kyc/resolve-kyc/:id", protectRoutes, resolve);
router.put("kyc/reject-kyc/:id", protectRoutes, reject);

module.exports = router;
