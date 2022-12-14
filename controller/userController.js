const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const fs = require("fs");

// desc Register new user
// route Post api/users
//access Public

const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    userName,
    displayName,
    password,
    status,
    phoneNumber,
    city,
    ethnicity,
    sexualOrientation,
    description,
    weight,
    color,
    eyesColor,
    height,
    country,
    gender,
    zipCode,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !userName ||
    !password ||
    !status ||
    !displayName
  ) {
    res.status(400).json({
      message: "Please input all fields",
    });
  }
  const userExist = await User.findOne({ email });
  const userNameExist = await User.findOne({ userName });
  if (userExist) {
    res.status(400).json({
      message: "User exists ",
    });
  }

  // if (userNameExist) {
  //   res.status(400).json({
  //     message: "UserName exists ",
  //   });
  // }
  // hashedPassword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    userName,
    displayName,
    ethnicity,
    city,
    country,
    color,
    description,
    weight,
    height,
    eyesColor,
    phoneNumber,
    sexualOrientation,
    password: hashedPassword,
    status,
    gender,
    zipCode,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      displayName: user.displayName,
      status: user.status,
      country: user.country,
      ethnicity: user.ethnicity,
      sexualOrientation: user.sexualOrientation,
      phoneNumber: user.phoneNumber,
      weight: user.weight,
      height: user.height,
      description: user.description,
      city: user.city,
      gender: user.gender,
      color: user.color,
      eyesColor: user.eyesColor,
      zipCode: user.zipCode,
      token: generateToken(user._id),
    });
  } else {
    res.status(404).json({
      message: "Can't create user",
    });
  }
});

//desc Login User
//route Post api/users/login
//access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Please input all fields",
    });
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      status: user.status,
      description: user.description,
      displayName: user.displayName,
      gender: user.gender,
      height: user.height,
      weight: user.weight,
      sexualOrientation: user.sexualOrientation,
      eyesColor: user.eyesColor,
      color: user.color,
      token: generateToken(user._id),
    });
  } else {
    res.status(404).json({
      message: "Invalid Credentials",
    });
  }
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
  res.json({ message: "user data" });
});
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const updateProflie = asyncHandler(async (req, res) => {
  const userUpdate = await User.findById(req.params.id);
  const {
    displayName,
    description,
    gender,
    height,
    weight,
    sexualOrientation,
    eyesColor,
    color,
  } = req.body;
  if (
    !displayName ||
    !description ||
    !gender ||
    !height ||
    !weight ||
    !sexualOrientation ||
    !eyesColor ||
    !color
  ) {
    res.status(400).json({
      message: "Please input all fields",
    });
  }

  if (!userUpdate) {
    res.status(400).json({
      message: "User not found",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      description: req.body.description,
      displayName: req.body.displayName,
      gender: req.body.gender,
      height: req.body.height,
      weight: req.body.weight,
      sexualOrientation: req.body.sexualOrientation,
      eyesColor: req.body.eyesColor,
      color: req.body.color,
    },
    {
      new: true,
    }
  );
  res.status(200).json(updatedUser);
  console.log(req.body.description);
});

const updateUserProfileImage = asyncHandler(async (req, res) => {
  const userUpdate = await User.findById(req.params.id);
  const saveImage = await User.findByIdAndUpdate(
    req.params.id,
    {
      image: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png or image/jpeg or image/jpg",
      },
    },
    {
      new: true,
    }
  );
  res.status(200).json("Image saved");
});

const updateUserBackgroundProfileImage = asyncHandler(async (req, res) => {
  const userUpdate = await User.findById(req.params.id);
  const saveImage = await User.findByIdAndUpdate(
    req.params.id,
    {
      backgroundImage: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png or image/jpeg or image/jpg",
      },
    },
    {
      new: true,
    }
  );
  res.status(200).json("Image saved");
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProflie,
  updateUserProfileImage,
  updateUserBackgroundProfileImage,
  getAllUsers,
};
