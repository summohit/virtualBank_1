const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chequeSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
    },
    ifscCode: {
      type: String,
    },
    type: {
      type: String,
    },
    payeeName: {
      type: String,
    },
    amount: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transactionhistory", chequeSchema);
