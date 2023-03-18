const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      //adding the product
      include: [Product],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category: req.body.category,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/update/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        category: req.params.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (categoryData) {
      res.status(404).json({ message: "could not be updated" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deleteCategory) {
      res.status(404).json({ message: "Category doesn't exist" });
    }
    res.status(200).json({ message: "Category gone" });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
