const { Rma } = require("../../models/inventory/rma");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const rmaList = await Rma.find();

  if (!rmaList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(rmaList);
});

router.get("/:id", async (req, res) => {
  const rma = await Rma.findById(req.params.id);

  if (!rma) {
    res.status(500).json({
      message: "The Rma with the given ID was not found!",
    });
  }

  res.status(200).send(rma);
});

router.post("/", async (req, res) => {
  let rma = new Rma({
    itmId: req.body.itmDId,
    rmaType: req.body.rmaType,
    remark: req.body.remark,
    created_by: req.body.created_by,
    created_at: req.body.created_at,
    updated_by: req.body.updated_by,
    updated_at: req.body.updated_at,
  });

  rma = await rma.save();

  if (!rma) return res.status(400).send("the Rma cannot be created!");

  res.status(200).send(rma);
});

router.delete("/:id", (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Rma Id");
  }

  Rma.findByIdAndRemove(req.params.id)
    .then((rma) => {
      if (rma) {
        return res.status(200).json({
          success: true,
          message: "the Rma is deleted!",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "the Rma not found!",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Rma Detail Id");
  }

  const rma = await Rma.findByIdAndUpdate(req.params.id, {
    itmId: req.body.itmDId,
    rmaType: req.body.rmaType,
    remark: req.body.remark,
    created_by: req.body.created_by,
    created_at: req.body.created_at,
    updated_by: req.body.updated_by,
    updated_at: req.body.updated_at,
  });

  if (!rma) return res.status(401).send("the Item Detail cannot be update!");

  res.status(200).send(rma);
});

module.exports = router;
