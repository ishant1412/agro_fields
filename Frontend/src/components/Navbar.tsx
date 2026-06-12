import { NavLink, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import ModeToggle from './ModeToggle'

const activeClass = 'text-emerald-600 font-semibold'
const normalClass = 'text-slate-600 hover:text-slate-900'

export default function Navbar() {
  const { cart } = useAppContext()
  const navigate = useNavigate()

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <button className="text-2xl font-semibold text-slate-900" onClick={() => navigate('/')}>AgriCommerce</button>
          <ModeToggle />
        </div>

        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
            Products
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
