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
    amount: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("transactionhistory", chequeSchema);
