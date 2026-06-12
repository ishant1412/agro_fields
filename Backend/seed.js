import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import 'dotenv/config.js'
import { connectDB } from './db.js'
import Category from './models/category.model.js'
import Product from './models/product.model.js'
import Order from './models/order.model.js'
import Enquiry from './models/enquiry.model.js'
import User from './models/user.model.js'

async function seed() {
  await connectDB()

  console.log('Clearing existing data...')
  await Promise.all([
    Category.deleteMany({}),
    Product.deleteMany({}),
    Order.deleteMany({}),
    Enquiry.deleteMany({}),
    User.deleteMany({}),
  ])

  console.log('Creating categories...')
  const categories = await Category.create([
    { name: 'Seeds', description: 'Quality seeds for crops and vegetables.' },
    { name: 'Fertilizers', description: 'Essential nutrients for healthy soil and plants.' },
    { name: 'Tools', description: 'Hand tools and equipment for field work.' },
    { name: 'Harvest', description: 'Post-harvest and storage products.' },
  ])

  console.log('Creating products...')
  const products = await Product.create([
    {
      name: 'Premium Wheat Seeds',
      description: 'High-yield wheat seeds for a strong harvest season.',
      price: 450,
      wholesalePrice: 390,
      isWholesale: true,
      stock: 150,
      category: categories[0]._id,
      image: 'https://images.unsplash.com/photo-1518977956812-33d17fb14915?auto=format&fit=crop&w=900&q=60',
    },
    {
      name: 'Organic Vegetable Fertilizer',
      description: 'Nutrient-rich fertilizer suitable for all vegetable varieties.',
      price: 580,
      wholesalePrice: 500,
      isWholesale: true,
      stock: 120,
      category: categories[1]._id,
      image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=900&q=60',
    },
    {
      name: 'Multipurpose Gardening Tool Set',
      description: 'Durable tools for digging, pruning and planting.',
      price: 950,
      stock: 90,
      category: categories[2]._id,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=60',
    },
    {
      name: 'Cold Storage Bags',
      description: 'Reusable storage bags for fresh produce and harvest transport.',
      price: 320,
      stock: 180,
      category: categories[3]._id,
      image: 'https://images.unsplash.com/photo-1510751007277-369e5def5d33?auto=format&fit=crop&w=900&q=60',
    },
    {
      name: 'Bio Pesticide Spray',
      description: 'Safe pesticide spray for pest management with minimal residue.',
      price: 620,
      wholesalePrice: 540,
      isWholesale: true,
      stock: 75,
      category: categories[1]._id,
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=60',
    },
  ])

  console.log('Creating users...')
  const users = [
    { name: 'Admin User', email: 'admin@agricommerce.com', password: 'admin123', role: 'admin' },
    { name: 'Regular User', email: 'user@agricommerce.com', password: 'user123', role: 'user' },
  ]
  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    })),
  )
  await User.create(hashedUsers)

  console.log('Creating orders...')
  await Order.create([
    {
      customerName: 'Rohan Sharma',
      email: 'rohan@example.com',
      phone: '+91 98765 43210',
      address: 'Village Road, Agra, India',
      items: [
        { product: products[0]._id, quantity: 2, price: products[0].price },
        { product: products[2]._id, quantity: 1, price: products[2].price },
      ],
      totalAmount: products[0].price * 2 + products[2].price * 1,
      status: 'pending',
      mode: 'b2c',
    },
    {
      customerName: 'Sunita Patel',
      email: 'sunita@example.com',
      phone: '+91 91234 56789',
      address: 'Farm Lane, Pune, India',
      items: [
        { product: products[1]._id, quantity: 3, price: products[1].price },
      ],
      totalAmount: products[1].price * 3,
      status: 'processing',
      mode: 'b2c',
    },
  ])

  console.log('Creating enquiries...')
  await Enquiry.create([
    {
      name: 'Amit Verma',
      email: 'amit@example.com',
      phone: '+91 99887 77665',
      product: products[1]._id,
      message: 'I need this fertilizer in bulk for my farm. Please share wholesale pricing.',
      status: 'pending',
    },
    {
      name: 'Neha Singh',
      email: 'neha@example.com',
      phone: '+91 98765 12345',
      product: products[4]._id,
      message: 'Interested in purchasing the pesticide spray for commercial use.',
      status: 'reviewed',
    },
  ])

  console.log('Seed data has been created successfully.')
  await mongoose.connection.close()
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
