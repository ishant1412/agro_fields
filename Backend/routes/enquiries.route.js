import { Router } from 'express'
import {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
} from '../controllers/enquiries.controllers.js'
import { requireAuth, requireAdmin } from '../middleware/auth.middleware.js'

const router = Router()

router.get('', requireAuth, requireAdmin, getEnquiries)
router.get('/:id', requireAuth, getEnquiryById)
router.post('/', createEnquiry)
router.put('/:id', requireAuth, requireAdmin, updateEnquiry)
router.delete('/:id', requireAuth, requireAdmin, deleteEnquiry)

export default router
