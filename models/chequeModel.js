const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chequeSchema = new mongoose.Schema(
  {
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
    },
    chequeBookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chequeBook",
    },
    chequeStatus: {
      type: Number,
      default: 0,
    },
    amount: {
      type: Number,
      default: 0,
    },
    payeeName: {
      type: String,
      default: "",
      trim: true,
    },
    qrcode: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cheque", chequeSchema);
