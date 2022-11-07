const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  manId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manufacturer",
  },
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  name: {
    type: String,
    default: "",
  },
  unitType: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  partNo: {
    type: String,
    default: "",
  },
  exPartNo: {
    type: String,
    default: "",
  },
  eanCode: {
    type: String,
    default: "",
  },
  totalQuantity: {
    type: Number,
    default: 0,
  },
  remainQuantity: {
    type: Number,
    default: 0,
  },
  threshold: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  tag: {
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
  isDelete: {
    type: Number,
    default: 0,
  },
});

itemSchema.virtual("itmId").get(function () {
  return this._id.toHexString();
});

itemSchema.set("toJSON", {
  virtuals: true,
});

exports.Item = mongoose.model("Item", itemSchema);
