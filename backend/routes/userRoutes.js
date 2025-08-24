const express = require("express");
const {
  uploadKyc,
  updateUser,
  getAllUser,
  getUserById,
  deleteuser,
  getKyc,
} = require("../controller/userController");

const upload = require("../middlewares/multer");
const { protectRoutes, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();



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

router.get("/", protectRoutes, authorize("admin"), getAllUser);
router.get("/:id", protectRoutes, authorize("admin"), getUserById);
router.get("/all", protectRoutes, getKyc)


router.put(
  "/update-user/:id",
  protectRoutes,
  authorize("user"),
  upload.single("profilePic"),
  updateUser
);

router.delete("/:id", protectRoutes, deleteuser);

module.exports = router;
