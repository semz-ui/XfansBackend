const asyncHandler = require("express-async-handler");
const Post = require("../model/postModel");
const fs = require("fs");

const postImg = asyncHandler(async (req, res) => {
  const saveImage = Post({
    user: req.user.id,
    postImage: {
      data: fs.readFileSync("uploads/" + req.files[0].filename),
      contentType: "image/png or image/jpeg or image/jpg",
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image saved");
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
  res.send(saveImage + "Image saved");
});

const getImg = asyncHandler(async (req, res) => {
  const img = await Post.find({ user: req.user.id });
  res.status(200).json(img);
});

const getAllImgs = asyncHandler(async (req, res) => {
  const imgs = await Post.find();
  res.status(200).json(imgs);
});

module.exports = {
  postImg,
  getImg,
  getAllImgs,
};
