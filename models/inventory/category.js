const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  parentId: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: "",
  },
  tag: {
    type: String,
    default: "",
  },
  isDelete: {
    type: Number,
    default: 0,
  },
});

categorySchema.virtual("catId").get(function () {
  return this._id.toHexString();
});

categorySchema.set("toJSON", {
  virtuals: true,
});

exports.Category = mongoose.model("Category", categorySchema);
