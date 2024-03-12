const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bankSchema = new mongoose.Schema(
  {
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staticBank",
    },
    bankName: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    isDefaultBank: {
      type: Boolean,
      default: true,
    },
    accountHolderName: {
      type: String,
      trim: true,
    },
    accountNumber: {
      type: String,
      trim: true,
    },
    ifscCode: {
      type: String,
      trim: true,
    },
    micrCode: {
      type: String,
      trim: true,
    },
    branchName: {
      type: String,
      trim: true,
    },
    branchAddress: {
      type: String,
      trim: true,
    },
    balance: {
      type: Number,
      default:20000

    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bank", bankSchema);
