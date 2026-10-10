import { useState } from 'react'
import { TodoInput } from './components/TodoInput.tsx'
import { TodoItem } from './components/TodoItem.tsx'
import { TodoFilters } from './components/TodoFilters.tsx'
import { useTodos } from './hooks/useTodos.ts'
import type { Filter } from './types.ts'
import './App.css'

function App() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted } =
    useTodos()
  const [filter, setFilter] = useState<Filter>('all')

  const visibleTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })
  const completedCount = todos.filter((t) => t.completed).length
  const activeCount = todos.length - completedCount

  return (
    <main className="todo-app">
      <h1>Todos</h1>
      <TodoInput onAdd={addTodo} />

      {todos.length === 0 ? (
        <p className="empty">Nothing to do yet. Add your first task above.</p>
      ) : (
        <>
          <ul className="todo-list">
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
          {visibleTodos.length === 0 && (
            <p className="empty">No {filter} todos.</p>
          )}
          <TodoFilters
            filter={filter}
            onChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        </>
      )}
    </main>
  )
}

export default App
