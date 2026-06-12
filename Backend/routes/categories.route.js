import { Router } from 'express'
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.controllers.js'
import { requireAuth, requireAdmin } from '../middleware/auth.middleware.js'

const router = Router()

router.get('', getCategories)
router.get('/:id', getCategoryById)
router.post('/', requireAuth, requireAdmin, createCategory)
router.put('/:id', requireAuth, requireAdmin, updateCategory)
router.delete('/:id', requireAuth, requireAdmin, deleteCategory)

export default router
