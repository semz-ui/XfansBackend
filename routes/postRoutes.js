const multer = require("multer");
const {
  postImg,
  getImg,
  getAllImgs,
} = require("../controller/postContrroller");
const { protect } = require("../middleware/authMiddleWare");
const express = require("express");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("postImage"), protect, postImg);
router.get("/me", protect, getImg);
router.get("/all", getAllImgs);

module.exports = router;
