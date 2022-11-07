const { ItemDetail } = require("../../models/inventory/itemDetail");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const itemDetailList = await ItemDetail.find();

  if (!itemDetailList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(itemDetailList);
});

router.get("/:id", async (req, res) => {
  const itemDetail = await ItemDetail.findById(req.params.id);

  if (!itemDetail) {
    res.status(500).json({
      message: "The Item Detail with the given ID was not found!",
    });
  }

  res.status(200).send(itemDetail);
});

router.post("/", async (req, res) => {
  let itemDetail = new ItemDetail({
    itmId: req.body.itmId,
    serialNum: req.body.serialNum,
    isAutoGenerate: req.body.isAutoGenerate,
    status: req.body.status,
  });

  itemDetail = await itemDetail.save();

  if (!itemDetail)
    return res.status(400).send("the Item Detail cannot be created!");

  res.status(200).send(itemDetail);
});

router.delete("/:id", (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Item Detail Id");
  }

  ItemDetail.findByIdAndRemove(req.params.id)
    .then((itemDetail) => {
      if (itemDetail) {
        return res.status(200).json({
          success: true,
          message: "the Item Detail is deleted!",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "the Item Detail not found!",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Item Detail Id");
  }

  const itemDetail = await ItemDetail.findByIdAndUpdate(req.params.id, {
    itmId: req.body.itmId,
    serialNum: req.body.serialNum,
    isAutoGenerate: req.body.isAutoGenerate,
    status: req.body.status,
  });

  if (!itemDetail)
    return res.status(401).send("the Item Detail cannot be update!");

  res.status(200).send(itemDetail);
});

module.exports = router;
