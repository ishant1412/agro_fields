import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { loginUser, registerUser } from '../services/auth.service'
import { setAuthToken } from '../services/api'

export type User = {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

export type Product = {
  _id: string
  name: string
  description: string
  price: number
  wholesalePrice?: number
  stock?: number
  image?: string
  category?: { _id: string; name: string }
}

export type Category = {
  _id: string
  name: string
}

export type CartItem = {
  product: Product
  quantity: number
}

type AppContextType = {
  mode: 'b2c' | 'b2b'
  setMode: (mode: 'b2c' | 'b2b') => void
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  categories: Category[]
  setCategories: (categories: Category[]) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  user: User | null
  token: string | null
  login: (credentials: { email: string; password: string }) => Promise<void>
  register: (credentials: { name: string; email: string; password: string }) => Promise<void>
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const CART_KEY = 'agricommerce-cart'
const MODE_KEY = 'agricommerce-mode'
const CATEGORY_KEY = 'agricommerce-category'
const AUTH_USER_KEY = 'agricommerce-user'
const AUTH_TOKEN_KEY = 'agricommerce-token'

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<'b2c' | 'b2b'>(() => {
    const saved = window.localStorage.getItem(MODE_KEY)
    return saved === 'b2b' ? 'b2b' : 'b2c'
  })
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = window.localStorage.getItem(CART_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategoryState] = useState<string>(() => {
    return window.localStorage.getItem(CATEGORY_KEY) || ''
  })
  const [user, setUser] = useState<User | null>(() => {
    const saved = window.localStorage.getItem(AUTH_USER_KEY)
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState<string | null>(() => {
    return window.localStorage.getItem(AUTH_TOKEN_KEY)
  })

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    window.localStorage.setItem(MODE_KEY, mode)
  }, [mode])

  useEffect(() => {
    window.localStorage.setItem(CATEGORY_KEY, selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    } else {
      window.localStorage.removeItem(AUTH_USER_KEY)
    }
  }, [user])

  useEffect(() => {
    if (token) {
      window.localStorage.setItem(AUTH_TOKEN_KEY, token)
      setAuthToken(token)
    } else {
      window.localStorage.removeItem(AUTH_TOKEN_KEY)
      setAuthToken(null)
    }
  }, [token])

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product._id === product._id)
      if (existing) {
        return current.map((item) =>
          item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((current) => current.filter((item) => item.product._id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    setCart((current) =>
      current.map((item) =>
        item.product._id === id ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const setMode = (value: 'b2c' | 'b2b') => {
    setModeState(value)
  }

  const setSelectedCategory = (value: string) => {
    setSelectedCategoryState(value)
  }

  const login = async ({ email, password }: { email: string; password: string }) => {
    const response = await loginUser({ email, password })
    setUser(response.user)
    setToken(response.token)
  }

  const register = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const response = await registerUser({ name, email, password })
    setUser(response.user)
    setToken(response.token)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  const value = useMemo(
    () => ({
      mode,
      setMode,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      categories,
      setCategories,
      selectedCategory,
      setSelectedCategory,
      user,
      token,
      login,
      register,
      logout,
    }),
    [cart, categories, mode, selectedCategory, user, token],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider')
  }
  return context
}
