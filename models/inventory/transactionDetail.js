const mongoose = require("mongoose");

const transactionDetailSchema = mongoose.Schema({
  tranId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
  },
  serialNum: {
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

transactionDetailSchema.virtual("tranDId").get(function () {
  return this._id.toHexString();
});

transactionDetailSchema.set("toJSON", {
  virtuals: true,
});

exports.TransactionDetail = mongoose.model(
  "TransactionDetail",
  transactionDetailSchema
);
