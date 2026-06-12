import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  image: { type: String, default: '' },
  stock: { type: Number, default: 0 },
  isWholesale: { type: Boolean, default: false },
  wholesalePrice: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Product', productSchema)
