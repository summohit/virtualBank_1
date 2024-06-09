const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pensionAmountSchema = new mongoose.Schema(
  {

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    amount: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("pensionAmountSchema", pensionAmountSchema);
