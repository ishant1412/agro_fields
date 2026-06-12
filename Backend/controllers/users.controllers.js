import User from '../models/user.model.js'

export async function getUsers(req, res) {
  try {
    const users = await User.find().select('-password')
    return res.json(users)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch users', error: error.message })
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch user', error: error.message })
  }
}

export async function createUser(req, res) {
  try {
    const existing = await User.findOne({ email: req.body.email })
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' })
    }
    const user = new User(req.body)
    const saved = await user.save()
    const { password, ...payload } = saved.toObject()
    return res.status(201).json(payload)
  } catch (error) {
    return res.status(400).json({ message: 'Unable to create user', error: error.message })
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const { password: removedPassword, ...payload } = user.toObject()
    return res.json(payload)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to log in', error: error.message })
  }
}

export async function updateUser(req, res) {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password')
    if (!updated) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.json(updated)
  } catch (error) {
    return res.status(400).json({ message: 'Unable to update user', error: error.message })
  }
}

export async function deleteUser(req, res) {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.json({ message: 'User deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete user', error: error.message })
  }
}
