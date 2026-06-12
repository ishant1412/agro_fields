import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, default: '' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  message: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'responded', 'closed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Enquiry', enquirySchema)
