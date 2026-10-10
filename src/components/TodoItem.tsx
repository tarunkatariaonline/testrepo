import { useRef, useState, type KeyboardEvent } from 'react'
import type { Todo } from '../types.ts'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  // Some browsers fire blur when the focused input unmounts; this stops that
  // blur from re-saving after Enter or saving a draft the user cancelled.
  const skipBlurRef = useRef(false)

  const startEditing = () => {
    skipBlurRef.current = false
    setDraft(todo.text)
    setEditing(true)
  }

  const finishEditing = (save: boolean) => {
    if (save && draft.trim()) {
      onEdit(todo.id, draft)
    } else {
      setDraft(todo.text)
    }
    setEditing(false)
  }

  const handleBlur = () => {
    if (skipBlurRef.current) return
    finishEditing(true)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      skipBlurRef.current = true
      finishEditing(e.key === 'Enter')
    }
  }

  return (
    <li className={`todo-item${todo.completed ? ' done' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'active' : 'completed'}`}
      />
      {editing ? (
        <input
          className="edit"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-label="Edit todo"
          autoFocus
        />
      ) : (
        <span
          className="text"
          onDoubleClick={startEditing}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}
      <button
        type="button"
        className="delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        ×
      </button>
    </li>
  )
}
