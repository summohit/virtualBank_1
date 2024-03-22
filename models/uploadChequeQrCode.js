const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uploadQRSchema = new mongoose.Schema(
  {
    qrCode: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
    },
    leaf: {
      type: String,
    },
    alias: {
      type: String,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("uploadchequeqr", uploadQRSchema);
