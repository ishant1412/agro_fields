import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAppContext()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
