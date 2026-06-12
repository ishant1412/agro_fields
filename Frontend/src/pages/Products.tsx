import { useEffect, useState } from 'react'
import { useAppContext, type Product } from '../context/AppContext'
import { fetchCategories, fetchProducts } from '../services/product.service'
import CategoryFilter from '../components/CategoryFilter'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const { addToCart, categories, setCategories, mode, selectedCategory, setSelectedCategory } = useAppContext()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const [productList, categoryList] = await Promise.all([fetchProducts(), fetchCategories()])
        setProducts(productList)
        setCategories(categoryList)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [setCategories])

  const filteredProducts = products.filter((product: any) => {
    return selectedCategory ? product.category?._id === selectedCategory : true
  })

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <CategoryFilter categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Products</p>
            <h1 className="text-3xl font-semibold text-slate-900">Marketplace</h1>
          </div>
          <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700 shadow-sm">
            Current mode: <strong>{mode.toUpperCase()}</strong>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">Loading products…</div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">No products found.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} mode={mode} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
