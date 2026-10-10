import type { Filter } from '../types.ts'

const FILTERS: Filter[] = ['all', 'active', 'completed']

interface Props {
  filter: Filter
  onChange: (filter: Filter) => void
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
}

export function TodoFilters({
  filter,
  onChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: Props) {
  return (
    <footer className="todo-filters">
      <span>
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>
      <div className="filter-buttons">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={f === filter ? 'selected' : ''}
            aria-pressed={f === filter}
            onClick={() => onChange(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="clear"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  )
}
