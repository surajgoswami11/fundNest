const express = require("express");
const {
  uploadKyc,
  updateUser,
  getAllUser,
  getUserById,
  deleteuser,
} = require("../controller/userController");

const upload = require("../middlewares/multer");
const { protectRoutes } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protectRoutes, getAllUser);
router.get("/:id", protectRoutes, getUserById);

router.post(
  "/kyc",
  protectRoutes,
  upload.fields([
    { name: "passbookImage", maxCount: 2 },
    { name: "aadharImage", maxCount: 2 },
    { name: "panImage", maxCount: 2 },
  ]),
  uploadKyc
);
router.put(
  "/update-user/:id",
  protectRoutes,
  upload.single("profilePic"),
  updateUser
);

router.delete("/:id", protectRoutes, deleteuser);

module.exports = router;
