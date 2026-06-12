import { useAppContext } from '../context/AppContext'

export default function ModeToggle() {
  const { mode, setMode } = useAppContext()

  return (
    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 shadow-sm">
      <button
        className={`rounded-full px-3 py-1 ${mode === 'b2c' ? 'bg-emerald-600 text-white' : 'text-slate-700'}`}
        onClick={() => setMode('b2c')}
      >
        B2C
      </button>
      <button
        className={`rounded-full px-3 py-1 ${mode === 'b2b' ? 'bg-emerald-600 text-white' : 'text-slate-700'}`}
        onClick={() => setMode('b2b')}
      >
        B2B
      </button>
    </div>
  )
}
