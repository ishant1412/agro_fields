import { Router } from "express"
import {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  getCurrentUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers.js"
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js"

const router = Router()

router.post('/', createUser)
router.post('/login', loginUser)
router.get('/me', requireAuth, getCurrentUser)
router.get('', requireAuth, requireAdmin, getUsers)
router.get('/:id', requireAuth, getUserById)
router.put('/:id', requireAuth, updateUser)
router.delete('/:id', requireAuth, requireAdmin, deleteUser)

export default router
