const mongoose = require("mongoose");

const manufacturerSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  code: {
    type: String,
    default: "",
  },
  tag: {
    type: String,
    default: "",
  },
});

manufacturerSchema.virtual("manId").get(function () {
  return this._id.toHexString();
});

manufacturerSchema.set("toJSON", {
  virtuals: true,
});

exports.Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);
