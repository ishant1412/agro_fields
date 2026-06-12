export default function Contact() {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900">Contact</h1>
      <p className="text-slate-600 leading-7">Have a question or want to submit a wholesale enquiry? Reach out and our team will respond quickly.</p>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Head office</h2>
          <p className="mt-3 text-slate-600">123 Agri Road<br />Rural City, State 12345</p>
          <p className="mt-4 text-slate-600">Email: support@agricommerce.example<br />Phone: +91 98765 43210</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Support</h2>
          <p className="mt-3 text-slate-600">Admin and enquiry management is handled through the backend API. Create products, categories, orders, and enquiries using the connected endpoints.</p>
        </div>
      </div>
    </section>
  )
}
