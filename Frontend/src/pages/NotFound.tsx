import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <h1 className="text-4xl font-semibold text-slate-900">404</h1>
      <p className="mt-4 text-lg text-slate-600">Page not found. Return to the product marketplace to continue shopping.</p>
      <Link to="/products" className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
        Browse products
      </Link>
    </div>
  )
}
