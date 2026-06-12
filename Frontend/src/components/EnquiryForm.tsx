import { useState, type FormEvent } from 'react'
import { submitEnquiry } from '../services/product.service'

type Props = {
  productId: string
}

export default function EnquiryForm({ productId }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      await submitEnquiry({
        product: productId,
        name,
        email,
        phone,
        message,
      })
      setStatus('success')
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
    } catch (error) {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">Wholesale Enquiry</h3>
      <p className="mt-2 text-sm text-slate-600">Submit your enquiry and our team will respond promptly.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-700">
            <span>Name</span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500"
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
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500"
            />
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-700">
          <span>Phone</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Phone number"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span>Message</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us about your enquiry"
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-500"
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? 'Sending...' : 'Send Enquiry'}
          </button>
          {status === 'success' && <p className="text-sm text-emerald-600">Your enquiry has been submitted.</p>}
          {status === 'error' && <p className="text-sm text-rose-600">Unable to submit enquiry. Please try again.</p>}
        </div>
      </form>
    </section>
  )
}
