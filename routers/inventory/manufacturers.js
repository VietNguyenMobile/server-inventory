const { Manufacturer } = require("../../models/inventory/manufacturer");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const manufacturerList = await Manufacturer.find();

  if (!manufacturerList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(manufacturerList);
});

router.get("/:id", async (req, res) => {
  const manufacturer = await Manufacturer.findById(req.params.id);

  if (!manufacturer) {
    res
      .status(500)
      .json({ message: "The manufacturer with the given ID was not found!" });
  }

  res.status(200).send(manufacturer);
});

router.post("/", async (req, res) => {
  let manufacturer = new Manufacturer({
    name: req.body.name,
    code: req.body.code,
    tag: req.body.tag,
  });

  manufacturer = await manufacturer.save();

  if (!manufacturer)
    return res.status(400).send("the manufacturer cannot be created!");

  res.status(200).send(manufacturer);
});

router.delete("/:id", (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Manufacturer Id");
  }

  Manufacturer.findByIdAndRemove(req.params.id)
    .then((manufacturer) => {
      if (manufacturer) {
        return res
          .status(200)
          .json({ success: true, message: "the manufacturer is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the manufacturer not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid manufacturer Id");
  }

  const manufacturer = await Manufacturer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    code: req.body.code,
    tag: req.body.tag,
  });

  if (!manufacturer)
    return res.status(401).send("the manufacturer cannot be update!");

  res.status(200).send(manufacturer);
});

module.exports = router;
