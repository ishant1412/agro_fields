import { Router } from "express"
import {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers.js"

const router = Router()

router.get('', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.post('/login', loginUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
