import 'dotenv/config.js'
import express from "express"
import cors from "cors"
import { connectDB } from "./db.js"
import productRoutes from "./routes/product.route.js"
import categoryRoutes from "./routes/categories.route.js"
import orderRoutes from "./routes/orders.route.js"
import enquiryRoutes from "./routes/enquiries.route.js"
import userRoutes from "./routes/user.route.js"

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'AgriCommerce backend is running' })
})

connectDB()
  .then(() => {
    app.listen(port,() => {
      console.log(`Backend running at http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message)
    process.exit(1)
  })
