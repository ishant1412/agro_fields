export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">© 2026 AgriCommerce. Built for farmers and buyers.</p>
        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <span>Support</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </footer>
  )
}
