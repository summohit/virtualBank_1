const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const beneficiarySchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      trim: true,
    },
    beneficiaryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    fullName: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("beneficiary", beneficiarySchema);
