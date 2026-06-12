import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Home() {
  const { mode } = useAppContext()
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] bg-gradient-to-r from-emerald-600 via-emerald-500 to-slate-900 px-6 py-16 text-white shadow-2xl sm:px-12 lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.3em] text-white/80">
            Fresh agri commerce
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Grow your agricultural business with ease.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
            Browse curated products, switch between retail and wholesale, and manage orders or enquiries from one fast, responsive storefront.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-lg transition hover:bg-emerald-50"
            >
              Shop products
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Contact support
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{mode === 'b2c' ? 'Customer shopping' : 'Wholesale enquiries'}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {mode === 'b2c'
              ? 'Browse catalog items, add to cart, and complete checkout with a smooth B2C experience.'
              : 'Submit a wholesale enquiry for larger quantities and receive a quick response from our team.'}
          </p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Reliable products</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Farmers and buyers can explore seed, fertilizer, and fresh produce listings with product details and category filters.</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Admin management</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Use the backend API to manage orders, enquiries, products, and categories from the connected admin surface.</p>
        </article>
      </div>
    </section>
  )
}
