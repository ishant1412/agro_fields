export default function About() {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900">About AgriCommerce</h1>
      <p className="text-slate-600 leading-7">
        AgriCommerce connects agricultural buyers and sellers with a clean, responsive frontend experience built for both retail and wholesale commerce. Switch between B2C and B2B modes as you browse products and manage your orders or enquiries.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Retail shopping</h2>
          <p className="mt-3 text-slate-600">Browse products, add items to your cart, and complete checkout using a modern e-commerce flow.</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Wholesale enquiries</h2>
          <p className="mt-3 text-slate-600">Submit enquiries for bulk purchases and let the AgriCommerce team handle your wholesale requests.</p>
        </div>
      </div>
    </section>
  )
}
