import Product from '../models/product.model.js'

export async function getProducts(req, res) {
  try {
    const products = await Product.find().populate('category')
    return res.json(products)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch products', error: error.message })
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id).populate('category')
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    return res.json(product)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch product', error: error.message })
  }
}

export async function createProduct(req, res) {
  try {
    const product = new Product(req.body)
    const saved = await product.save()
    return res.status(201).json(saved)
  } catch (error) {
    return res.status(400).json({ message: 'Unable to create product', error: error.message })
  }
}

export async function updateProduct(req, res) {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) {
      return res.status(404).json({ message: 'Product not found' })
    }
    return res.json(updated)
  } catch (error) {
    return res.status(400).json({ message: 'Unable to update product', error: error.message })
  }
}

export async function deleteProduct(req, res) {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' })
    }
    return res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete product', error: error.message })
  }
}
