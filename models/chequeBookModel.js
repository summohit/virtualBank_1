const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chequeBookSchema = new mongoose.Schema(
  {
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    numberOfPages: {
      type: Number,
      default: 25,
    },
    status: {
      type: Number,
      default: 0,
    },
    chequeBookQrCode: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chequeBook", chequeBookSchema);
