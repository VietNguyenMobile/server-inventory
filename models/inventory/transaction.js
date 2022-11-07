const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  itmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },
  idStaff: {
    type: String,
    default: "",
  },
  quantity: {
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
});

transactionSchema.virtual("tranId").get(function () {
  return this._id.toHexString();
});

transactionSchema.set("toJSON", {
  virtuals: true,
});

exports.Transaction = mongoose.model("Transaction", transactionSchema);
