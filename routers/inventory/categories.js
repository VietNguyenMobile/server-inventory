const { Category } = require("../../models/inventory/category");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found!" });
  }

  res.status(200).send(category);
});

router.post("/", async (req, res) => {
  let category = new Category({
    parentId: req.body.parentId,
    name: req.body.name,
    tag: req.body.tag,
  });

  category = await category.save();

  if (!category) return res.status(400).send("the category cannot be created!");

  res.status(200).send(category);
});

router.delete("/:id", (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Category Id");
  }

  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the category not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid category Id");
  }

  const category = await Category.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    parentId: req.body.parentId,
    tag: req.body.tag,
  });

  if (!category) return res.status(401).send("the category cannot be update!");

  res.status(200).send(category);
});

module.exports = router;
