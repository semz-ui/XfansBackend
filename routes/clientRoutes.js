const express = require("express");
const multer = require("multer");
const {
  loginClient,
  registerClient,
} = require("../controller/clientController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleWare");

router.post("/", registerClient);
router.post("/login", loginClient);
// router.get("/me", protect, getMe);
// router.get("/all", getAllUsers);
// router.put("/update/:id", protect, updateProflie);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// router.put(
//   "/updateProfileImage/:id",
//   upload.single("testImage"),
//   protect,
//   updateUserProfileImage
// );
// router.put(
//   "/updateBackgroundProfileImage/:id",
//   upload.single("testImage"),
//   protect,
//   updateUserBackgroundProfileImage
// );

module.exports = router;
