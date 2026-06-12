import Enquiry from '../models/enquiry.model.js'

export async function getEnquiries(req, res) {
  try {
    const enquiries = await Enquiry.find().populate('product')
    return res.json(enquiries)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch enquiries', error: error.message })
  }
}

export async function getEnquiryById(req, res) {
  try {
    const enquiry = await Enquiry.findById(req.params.id).populate('product')
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' })
    }
    return res.json(enquiry)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch enquiry', error: error.message })
  }
}

export async function createEnquiry(req, res) {
  try {
    const enquiry = new Enquiry(req.body)
    const saved = await enquiry.save()
    return res.status(201).json(saved)
  } catch (error) {
    return res.status(400).json({ message: 'Unable to create enquiry', error: error.message })
  }
}

export async function updateEnquiry(req, res) {
  try {
    const updated = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) {
      return res.status(404).json({ message: 'Enquiry not found' })
    }
    return res.json(updated)
  } catch (error) {
    return res.status(400).json({ message: 'Unable to update enquiry', error: error.message })
  }
}

export async function deleteEnquiry(req, res) {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Enquiry not found' })
    }
    return res.json({ message: 'Enquiry deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete enquiry', error: error.message })
  }
}
