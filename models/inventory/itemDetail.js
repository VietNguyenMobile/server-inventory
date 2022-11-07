const mongoose = require("mongoose");

const itemDetailSchema = mongoose.Schema({
  itmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
  },
  serialNum: {
    type: String,
    default: "",
  },
  isAutoGenerate: {
    type: Number,
    default: 0,
  },
  status: {
    type: Number,
    default: 0,
  },
});

itemDetailSchema.virtual("itmDId").get(function () {
  return this._id.toHexString();
});

itemDetailSchema.set("toJSON", {
  virtuals: true,
});

exports.ItemDetail = mongoose.model("ItemDetail", itemDetailSchema);
