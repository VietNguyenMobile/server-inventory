const {
  TransactionDetail,
} = require("../../models/inventory/transactionDetail");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const transactionDetailList = await TransactionDetail.find();

  if (!transactionDetailList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(transactionDetailList);
});

router.get("/:id", async (req, res) => {
  const transactionDetail = await TransactionDetail.findById(req.params.id);

  if (!transactionDetail) {
    res.status(500).json({
      message: "The Transaction Detail with the given ID was not found!",
    });
  }

  res.status(200).send(transactionDetail);
});

router.post("/", async (req, res) => {
  let transactionDetail = new TransactionDetail({
    tranId: req.body.tranId,
    serialNum: req.body.serialNum,
    created_by: req.body.created_by,
  });

  transactionDetail = await transactionDetail.save();

  if (!transactionDetail)
    return res.status(400).send("the Transaction Detail cannot be created!");

  res.status(200).send(transactionDetail);
});

router.delete("/:id", (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Transaction Detail Id");
  }

  TransactionDetail.findByIdAndRemove(req.params.id)
    .then((transactionDetail) => {
      if (transactionDetail) {
        return res.status(200).json({
          success: true,
          message: "the Transaction Detail is deleted!",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "the Transaction Detail not found!",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Transaction Detail Id");
  }

  const transactionDetail = await TransactionDetail.findByIdAndUpdate(
    req.params.id,
    {
      tranId: req.body.tranId,
      serialNum: req.body.serialNum,
      created_by: req.body.created_by,
    }
  );

  if (!transactionDetail)
    return res.status(401).send("the Transaction Detail cannot be update!");

  res.status(200).send(transactionDetail);
});

module.exports = router;
