import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, mode } = useAppContext()

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Your cart is empty</h1>
        <p className="mt-4 text-slate-600">Add products from the marketplace to begin checkout.</p>
        <Link to="/products" className="mt-6 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
          Shop products
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Cart</p>
            <h1 className="text-3xl font-semibold text-slate-900">Your items</h1>
          </div>
          <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">Mode: {mode.toUpperCase()}</div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[3fr_1fr]">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.product._id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xl font-semibold text-slate-900">{item.product.name}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.product.description}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                    <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="rounded-full px-2 text-slate-700">-</button>
                    <span className="w-10 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="rounded-full px-2 text-slate-700">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.product._id)} className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-200">
                    Remove
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                <span>Price</span>
                <span>₹{(item.product.price * item.quantity).toFixed(0)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total.toFixed(0)}</span>
            </div>
          </div>
          <Link to="/checkout" className="block rounded-full bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700">
            Continue to checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
