import api from './api'

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterCredentials = {
  name: string
  email: string
  password: string
}

export async function loginUser(credentials: LoginCredentials) {
  const response = await api.post('/users/login', credentials)
  return response.data
}

export async function registerUser(credentials: RegisterCredentials) {
  const response = await api.post('/users', credentials)
  return response.data
}

export async function fetchCurrentUser() {
  const response = await api.get('/users/me')
  return response.data
}
