const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staticBankSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
      trim: true,
    },
    bankId: {
      type: String
    },
    bankImg: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("staticBank", staticBankSchema);
