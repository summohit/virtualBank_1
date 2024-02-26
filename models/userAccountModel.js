const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAccountSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      trim: true,
    },
    accounType: {
      type: String,
      enum: ["current", "saving"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "onhold"],
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    transactionPassword: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("useraccount", userAccountSchema);
