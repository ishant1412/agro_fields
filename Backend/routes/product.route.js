import { Router } from "express"
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controllers.js"
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js"

const router = Router()

router.get('', getProducts)
router.get('/:id', getProductById)
router.post('/', requireAuth, requireAdmin, createProduct)
router.put('/:id', requireAuth, requireAdmin, updateProduct)
router.delete('/:id', requireAuth, requireAdmin, deleteProduct)

export default router
