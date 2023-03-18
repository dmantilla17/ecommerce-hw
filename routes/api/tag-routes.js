const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [Product],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const findiD = await Tag.findByPk(req.params.id, {
      include: [Product],
    });
    res.status(200).json(findiD);
  } catch (err) {
    res.status(400).json(err);
  }
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag: req.body.category,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/.update:id", async (req, res) => {
  try {
    const updateTag = await Tag.update(
      {
        tag: req.params.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (updateTag) {
      res.status(404).json({ message: "could not be updated" });
      return;
    }
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.delete({
      where: { id: req.params.id },
    });
    if (deleteTag) {
      res.status(404).json({ message: "Tag doesn't exist" });
    }
    res.status(200).json({ message: "Tag gone" });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
