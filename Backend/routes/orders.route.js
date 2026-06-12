import { Router } from "express"
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.controllers.js"
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js"

const router = Router()

router.get('', requireAuth, requireAdmin, getOrders)
router.get('/:id', requireAuth, getOrderById)
router.post('/', createOrder)
router.put('/:id', requireAuth, requireAdmin, updateOrder)
router.delete('/:id', requireAuth, requireAdmin, deleteOrder)

export default router
