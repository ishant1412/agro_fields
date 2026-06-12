import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key'

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token missing' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      return res.status(401).json({ message: 'Invalid authentication token' })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid authentication token' })
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' })
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' })
  }
  next()
}
