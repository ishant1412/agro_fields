import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true, default: 0 },
})

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  items: { type: [orderItemSchema], required: true, default: [] },
  totalAmount: { type: Number, required: true, default: 0 },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending',
  },
  mode: {
    type: String,
    enum: ['b2c', 'b2b'],
    default: 'b2c',
  },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Order', orderSchema)
