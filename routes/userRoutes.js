const express = require("express");
const multer = require("multer");
const {
  loginUser,
  registerUser,
  getMe,
  updateProflie,
  updateUserProfileImage,
  updateUserBackgroundProfileImage,
  getAllUsers,
} = require("../controller/userController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleWare");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/all", getAllUsers);
router.put("/update/:id", protect, updateProflie);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.put(
  "/updateProfileImage/:id",
  upload.single("testImage"),
  protect,
  updateUserProfileImage
);
router.put(
  "/updateBackgroundProfileImage/:id",
  upload.single("testImage"),
  protect,
  updateUserBackgroundProfileImage
);

module.exports = router;
