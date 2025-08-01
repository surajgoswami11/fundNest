const express = require("express");
const {
  deleteFund,
  updateFund,
  getFundById,
  createFund,
  getAllFund,
} = require("../controller/fundController");
const { protectRoutes, authorize } = require("../middlewares/authMiddleware");

const upload = require("../middlewares/multer");

const router = express.Router();

router.post(
  "/create-fund",
  protectRoutes,
  upload.array("images", 5),
  createFund
);
router.get("/", protectRoutes,authorize,authorize('admin','user'), getAllFund);
router.get("/:id", protectRoutes,authorize('admin','user'), getFundById);
router.put("/:id", protectRoutes,authorize('admin','user'), upload.array("images", 5), updateFund);
router.delete("/:id", protectRoutes,authorize('admin','user'), deleteFund);

module.exports = router;
