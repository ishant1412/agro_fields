import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

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
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const CART_KEY = 'agricommerce-cart'
const MODE_KEY = 'agricommerce-mode'
const CATEGORY_KEY = 'agricommerce-category'

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

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    window.localStorage.setItem(MODE_KEY, mode)
  }, [mode])

  useEffect(() => {
    window.localStorage.setItem(CATEGORY_KEY, selectedCategory)
  }, [selectedCategory])

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
    }),
    [cart, categories, mode, selectedCategory],
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
