const express = require("express");

const { protectRoutes, authorize } = require("../middlewares/authMiddleware");
const {
  pendingKYC,
  resolve,
  reject,
} = require("../controller/adminController");

const router = express.Router();

router.get("/kyc/pending-kyc", protectRoutes,authorize('admin'), pendingKYC);
router.put("/kyc/resolve-kyc/:id", protectRoutes,authorize('admin'), resolve);
router.put("/kyc/reject-kyc/:id", protectRoutes, authorize('admin'),reject);

module.exports = router;
