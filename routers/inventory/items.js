const { Item } = require("../../models/inventory/item");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const itemList = await Item.find();

  if (!itemList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(itemList);
});

router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res
      .status(500)
      .json({ message: "The item with the given ID was not found!" });
  }

  res.status(200).send(item);
});

router.post("/", async (req, res) => {
  let item = new Item({
    manId: req.body.manId,
    catId: req.body.catId,
    name: req.body.name,
    unitType: req.body.unitType,
    imageUrl: req.body.imageUrl,
    partNo: req.body.partNo,
    exPartNo: req.body.exPartNo,
    eanCode: req.body.eanCode,
    totalQuantity: req.body.totalQuantity,
    remainQuantity: req.body.remainQuantity,
    threshold: req.body.threshold,
    tag: req.body.tag,
    created_by: req.body.created_by,
    created_at: req.body.created_at,
    updated_by: req.body.updated_by,
    updated_at: req.body.updated_at,
  });

  item = await item.save();

  if (!item) return res.status(400).send("the item cannot be created!");

  res.status(200).send(item);
});

router.delete("/:id", (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Item Id");
  }

  Item.findByIdAndRemove(req.params.id)
    .then((item) => {
      if (item) {
        return res
          .status(200)
          .json({ success: true, message: "the Item is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the Item not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Item Id");
  }

  const item = await Item.findByIdAndUpdate(req.params.id, {
    manId: req.body.manId,
    catId: req.body.catId,
    name: req.body.name,
    unitType: req.body.unitType,
    imageUrl: req.body.imageUrl,
    partNo: req.body.partNo,
    exPartNo: req.body.exPartNo,
    eanCode: req.body.eanCode,
    totalQuantity: req.body.totalQuantity,
    remainQuantity: req.body.remainQuantity,
    threshold: req.body.threshold,
    tag: req.body.tag,
    created_by: req.body.created_by,
    created_at: req.body.created_at,
    updated_by: req.body.updated_by,
    updated_at: req.body.updated_at,
  });

  if (!item) return res.status(401).send("the Item cannot be update!");

  res.status(200).send(item);
});

module.exports = router;
