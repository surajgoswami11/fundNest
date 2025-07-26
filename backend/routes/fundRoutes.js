const express = require("express");
const {
  deleteFund,
  updateFund,
  getFundById,
  createFund,
  getAllFund,
} = require("../controller/fundController");
const { protectRoutes } = require("../middlewares/authMiddleware");

const upload = require("../middlewares/multer");

const router = express.Router();

router.post(
  "/create-fund",
  protectRoutes,
  upload.array("images", 5),
  createFund
);
router.get("/", protectRoutes, getAllFund);
router.get("/:id", protectRoutes, getFundById);
router.put("/:id", protectRoutes, upload.array("images", 5), updateFund);
router.delete("/:id", protectRoutes, deleteFund);

module.exports = router;
