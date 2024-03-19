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
    type: {
      type: String,
    },
    cardType: {
      type: String,
    },
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("uploadqr", uploadQRSchema);
