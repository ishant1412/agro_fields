import mongoose from 'mongoose'
import "dotenv/config.js"
export async function connectDB() {
  const uri =  process.env.MONGO_URL
  await mongoose.connect(uri)
  console.log(`MongoDB connected: ${mongoose.connection.host}`)
}
