import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { submitOrder } from '../services/product.service'

export default function Checkout() {
  const { cart, clearCart, mode } = useAppContext()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!cart.length) return

    setLoading(true)
    setMessage(null)

    try {
      await submitOrder({
        customerName: name,
        email,
        phone,
        address,
        items: cart.map((item) => ({ product: item.product._id, quantity: item.quantity, price: item.product.price })),
        totalAmount: total,
        mode,
      })
      clearCart()
      setMessage('Order placed successfully.')
      setTimeout(() => navigate('/products'), 1200)
    } catch (error) {
      setMessage('Unable to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (mode === 'b2b') {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Checkout is only available in B2C mode</h1>
        <p className="mt-4 text-slate-600">Switch to B2C to complete the cart checkout flow.</p>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Your cart is empty</h1>
        <p className="mt-4 text-slate-600">Add products from the marketplace to complete checkout.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              <span>Name</span>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full name"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              <span>Phone</span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Phone number"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Address</span>
              <input
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Shipping address"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? 'Placing order…' : `Pay ₹${total.toFixed(0)}`}
          </button>
          {message ? <p className="text-sm text-slate-600">{message}</p> : null}
        </form>
      </section>

      <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{total.toFixed(0)}</span>
          </div>
          <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
            You are checking out in retail mode. Orders are created through the AgriCommerce API and can be managed from the backend.
          </div>
        </div>
      </aside>
    </div>
  )
}
