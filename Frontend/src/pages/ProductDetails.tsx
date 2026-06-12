import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { fetchProduct } from '../services/product.service'
import EnquiryForm from '../components/EnquiryForm'

export default function ProductDetails() {
  const { id } = useParams()
  const { mode, addToCart } = useAppContext()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(false)

    fetchProduct(id)
      .then((data) => setProduct(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">Loading product…</div>
  }

  if (error || !product) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
        <p>Unable to load product.</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Back to products
        </button>
      </div>
    )
  }

  const activePrice = mode === 'b2b' && product.wholesalePrice ? product.wholesalePrice : product.price

  return (
    <div className="grid gap-8 xl:grid-cols-[1.5fr_0.9fr]">
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">{product.category?.name || 'Agriculture'}</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">{product.name}</h1>
          </div>
          <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">Mode: {mode.toUpperCase()}</div>
        </div>
        <img
          src={product.image || 'https://images.unsplash.com/photo-1524594154907-5d90d84a4d8f?auto=format&fit=crop&w=1200&q=80'}
          alt={product.name}
          className="w-full rounded-3xl object-cover"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
            <p className="text-slate-600">{product.description}</p>
          </div>
          <div className="space-y-3 rounded-3xl bg-slate-50 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Price</p>
            <p className="text-3xl font-semibold text-slate-900">₹{activePrice.toFixed(0)}</p>
            <p className="text-sm text-slate-600">Stock: {product.stock ?? 'N/A'}</p>
            <button
              onClick={() => addToCart(product)}
              className="w-full rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              {mode === 'b2b' ? 'Save to enquiry list' : 'Add to cart'}
            </button>
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        {mode === 'b2b' ? <EnquiryForm productId={product._id} /> : null}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Quick actions</h2>
          <div className="mt-4 flex flex-col gap-3">
            <button
              onClick={() => addToCart(product)}
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Add to cart
            </button>
            <button
              onClick={() => navigate('/products')}
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              Back to products
            </button>
          </div>
        </section>
      </aside>
    </div>
  )
}
