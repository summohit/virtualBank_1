const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    mobileNumber: {
      type: Number,
      trim: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    state: {
      type: String,
      trim: true,
    },
    deviceId: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    deviceData: {
      deviceId: String,
      deviceModel: String,
      deviceName: String,
      deviceOS: String,
      deviceOSVersion: String,
    },
    profileImage: {
      type: String,
      trim: true,
    },
    pincode: Number,
    dateOfBirth: {
      type: String,
      trim: true,
    },
    token: String,
    isAllServiceActive: {
      type: Boolean,
      default: false,
    },
    userDetailQrCode:{
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Middleware to convert email to lowercase before saving
userSchema.pre('save', function (next) {
  this.email = this.email.toLowerCase();
  next();
});

module.exports = mongoose.model("user", userSchema);
