const { Transaction } = require("../../models/inventory/transaction");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const transactionList = await Transaction.find();

  if (!transactionList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(transactionList);
});

router.get("/:id", async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res
      .status(500)
      .json({ message: "The Transaction with the given ID was not found!" });
  }

  res.status(200).send(transaction);
});

router.post("/", async (req, res) => {
  let transaction = new Transaction({
    itmId: req.body.itmId,
    idStaff: req.body.idStaff,
    quantity: req.body.quantity,
    remark: req.body.remark,
    created_by: req.body.created_by,
    created_at: req.body.created_at,
  });

  transaction = await transaction.save();

  if (!transaction)
    return res.status(400).send("the Transaction cannot be created!");

  res.status(200).send(transaction);
});

router.delete("/:id", (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Transaction Id");
  }

  Transaction.findByIdAndRemove(req.params.id)
    .then((transaction) => {
      if (transaction) {
        return res
          .status(200)
          .json({ success: true, message: "the Transaction is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the Transaction not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Transaction Id");
  }

  const transaction = await Transaction.findByIdAndUpdate(req.params.id, {
    itmId: req.body.itmId,
    idStaff: req.body.idStaff,
    quantity: req.body.quantity,
    remark: req.body.remark,
    created_by: req.body.created_by,
    created_at: req.body.created_at,
  });

  if (!transaction)
    return res.status(401).send("the Transaction cannot be update!");

  res.status(200).send(transaction);
});

module.exports = router;
