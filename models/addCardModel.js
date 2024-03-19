  const mongoose = require("mongoose");
  const Schema = mongoose.Schema;

  const addCardSchema = new mongoose.Schema(
    {
      cardNumber: {
        type: String,
        trim: true,
      },
      cardType: {
        type: String,
        trim: true,
      },
      bank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bank",
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      cardHolderName: {
        type: String,
        trim: true,
      },
      cvv: {
        type: String,
        trim: true,
      },
      exprDate: {
        type: String,
        trim: true,
      },
      payeeName: {
        type: String,
        trim: true,
      },
      status: {
        type: Number,
        default: 0,
      },
      balance: {
        type: Number,
        default: 20000,
      },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("addCard", addCardSchema);
