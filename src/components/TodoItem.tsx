import { useState, type KeyboardEvent } from 'react'
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

  const commit = () => {
    if (draft.trim()) {
      onEdit(todo.id, draft)
    } else {
      setDraft(todo.text)
    }
    setEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commit()
    if (e.key === 'Escape') {
      setDraft(todo.text)
      setEditing(false)
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
          onBlur={commit}
          onKeyDown={handleKeyDown}
          aria-label="Edit todo"
          autoFocus
        />
      ) : (
        <span
          className="text"
          onDoubleClick={() => {
            setDraft(todo.text)
            setEditing(true)
          }}
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
