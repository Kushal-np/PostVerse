import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    const category = await Category.create({ name, slug, description });
    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating category" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching categories" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting category" });
  }
};
