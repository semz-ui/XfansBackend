const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const Client = require("../model/clientModel");
const fs = require("fs");

const registerClient = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    userName,
    displayName,
    password,
    status,
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
  const userExist = await Client.findOne({ email });
  if (userExist) {
    res.status(400).json({
      message: "User exists ",
    });
  }
  // hashedPassword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const client = await Client.create({
    firstName,
    lastName,
    email,
    userName,
    displayName,
    password: hashedPassword,
    status,
  });
  if (client) {
    res.status(201).json({
      _id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      userName: client.userName,
      displayName: client.displayName,
      status: client.status,
      token: generateToken(client._id),
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
const loginClient = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Please input all fields",
    });
  }
  const client = await Client.findOne({ email });
  if (client && (await bcrypt.compare(password, client.password))) {
    res.status(201).json({
      _id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      status: client.status,
      displayName: client.displayName,
      userName: client.userName,
      token: generateToken(client._id),
    });
  } else {
    res.status(404).json({
      message: "Invalide Credentials",
    });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  registerClient,
  loginClient,
};
