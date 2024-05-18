const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pensionSchema = new mongoose.Schema(
  {

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    isRequestApproved: {
      type: Boolean,
      default: false,
    },
    isDocumentUploaded: {
      type: Boolean,
      default: false,
    },
    rightImg:  {
      type: String,
    },
    leftImg:  {
      type: String,
    }, centerImg:  {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pensionSchema", pensionSchema);
