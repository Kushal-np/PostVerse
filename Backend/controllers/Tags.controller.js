import Tag from "../models/tag.model.js";

export const createTag = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const tag = await Tag.create({ name, slug });
    res.status(201).json({ success: true, tag });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating tag" });
  }
};

export const getTags = async (req, res) => {
  const tags = await Tag.find();
  res.status(200).json({ success: true, tags });
};

export const deleteTag = async (req, res) => {
  await Tag.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: "Tag deleted" });
};
