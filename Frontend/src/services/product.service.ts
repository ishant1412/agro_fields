import api from './api'
import type { Category, Product } from '../context/AppContext'

export async function fetchProducts() {
  const response = await api.get<Product[]>('/products')
  return response.data
}

export async function fetchProduct(id: string) {
  const response = await api.get<Product>(`/products/${id}`)
  return response.data
}

export async function fetchCategories() {
  const response = await api.get<Category[]>('/categories')
  return response.data
}

export async function submitOrder(order: object) {
  const response = await api.post('/orders', order)
  return response.data
}

export async function submitEnquiry(enquiry: object) {
  const response = await api.post('/enquiries', enquiry)
  return response.data
}
