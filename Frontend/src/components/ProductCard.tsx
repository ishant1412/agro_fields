import { Link } from 'react-router-dom'
import type { Product } from '../context/AppContext'

type Props = {
  product: Product
  onAddToCart: (product: Product) => void
  mode: 'b2c' | 'b2b'
}

export default function ProductCard({ product, onAddToCart, mode }: Props) {
  const price = mode === 'b2b' && product.wholesalePrice ? product.wholesalePrice : product.price
  const label = mode === 'b2b' ? 'Enquire Now' : 'Add to Cart'

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="min-h-[180px] bg-slate-100 p-4">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1524594154907-5d90d84a4d8f?auto=format&fit=crop&w=800&q=60'}
          alt={product.name}
          className="h-40 w-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">{product.category?.name || 'Agriculture'}</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">{product.name}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-3">{product.description}</p>
        </div>
        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-slate-900">₹{price.toFixed(0)}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
              {mode.toUpperCase()}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              onClick={() => onAddToCart(product)}
            >
              {label}
            </button>
            <Link
              to={`/products/${product._id}`}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
