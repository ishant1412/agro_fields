import Category from '../models/category.model.js'

export async function getCategories(req, res) {
  try {
    const categories = await Category.find()
    return res.json(categories)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch categories', error: error.message })
  }
}

export async function getCategoryById(req, res) {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    return res.json(category)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch category', error: error.message })
  }
}

export async function createCategory(req, res) {
  try {
    const category = new Category(req.body)
    const saved = await category.save()
    return res.status(201).json(saved)
  } catch (error) {
    return res.status(400).json({ message: 'Unable to create category', error: error.message })
  }
}

export async function updateCategory(req, res) {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) {
      return res.status(404).json({ message: 'Category not found' })
    }
    return res.json(updated)
  } catch (error) {
    return res.status(400).json({ message: 'Unable to update category', error: error.message })
  }
}

export async function deleteCategory(req, res) {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' })
    }
    return res.json({ message: 'Category deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete category', error: error.message })
  }
}
