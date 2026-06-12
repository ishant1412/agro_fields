import type { Category } from '../context/AppContext'

type Props = {
  categories: Category[]
  selected: string
  onSelect: (id: string) => void
}

export default function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          className={`rounded-full px-4 py-2 text-sm ${selected === '' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          onClick={() => onSelect('')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            className={`rounded-full px-4 py-2 text-sm ${selected === category._id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            onClick={() => onSelect(category._id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}
