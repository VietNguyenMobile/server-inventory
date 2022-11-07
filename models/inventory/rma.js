const mongoose = require("mongoose");

const rmaSchema = mongoose.Schema({
  // rmaId: {
  //   type: String,
  //   required: true,
  // },
  itmDId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemDetail",
  },
  rmaType: {
    type: Number,
    default: 0,
  },
  remark: {
    type: String,
    default: "",
  },
  created_by: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_by: {
    type: String,
    default: "",
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

rmaSchema.virtual("rmaId").get(function () {
  return this._id.toHexString();
});

rmaSchema.set("toJSON", {
  virtuals: true,
});

exports.Rma = mongoose.model("Rma", rmaSchema);
