import Order from '../models/order.model.js'

export async function getOrders(req, res) {
  try {
    const orders = await Order.find().populate('items.product')
    return res.json(orders)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch orders', error: error.message })
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate('items.product')
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    return res.json(order)
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch order', error: error.message })
  }
}

export async function createOrder(req, res) {
  try {
    const order = new Order(req.body)
    const saved = await order.save()
    return res.status(201).json(saved)
  } catch (error) {
    return res.status(400).json({ message: 'Unable to create order', error: error.message })
  }
}

export async function updateOrder(req, res) {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) {
      return res.status(404).json({ message: 'Order not found' })
    }
    return res.json(updated)
  } catch (error) {
    return res.status(400).json({ message: 'Unable to update order', error: error.message })
  }
}

export async function deleteOrder(req, res) {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' })
    }
    return res.json({ message: 'Order deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete order', error: error.message })
  }
}
