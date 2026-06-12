import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import type { ReactNode } from 'react'

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  )
}
