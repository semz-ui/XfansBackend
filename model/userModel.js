const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    userName: {
      type: String,
      required: true,
    },
    ethnicity: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    backgroundImage: {
      data: Buffer,
      contentType: String,
    },
    description: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
    weight: {
      type: String,
      default: null,
    },
    sexualOrientation: {
      type: String,
      default: null,
    },
    eyesColor: {
      type: String,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
