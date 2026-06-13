import { useState, useEffect } from 'react'
import { TodoProvider } from './context'
import './App.css'
import TodoForm from './components/TodoForm.jsx'
import TodoItem from './components/TodoItem.jsx'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? todo : t)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"))
    if (saved && saved.length > 0) setTodos(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'done') return t.completed
    return true
  })

  const doneCount = todos.filter((t) => t.completed).length
  const totalCount = todos.length
  const progress = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100)

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="app-bg">
        <div className="app-container">

          <header className="app-header">
            <div className="app-logo">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.9"/>
                <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.5"/>
                <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.5"/>
                <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.2"/>
              </svg>
            </div>
            <div>
              <h1 className="app-title">My Tasks</h1>
              <p className="app-subtitle">
                {totalCount === 0
                  ? "Nothing here yet — add your first task"
                  : `${doneCount} of ${totalCount} completed`}
              </p>
            </div>
          </header>

          {totalCount > 0 && (
            <div className="progress-section">
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="progress-label">{progress}%</span>
            </div>
          )}

          <div className="form-section">
            <TodoForm />
          </div>

          {totalCount > 0 && (
            <div className="filter-bar">
              {['all', 'active', 'done'].map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? 'filter-btn--active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? `All (${totalCount})` : f === 'active' ? `Active (${totalCount - doneCount})` : `Done (${doneCount})`}
                </button>
              ))}
            </div>
          )}

          <div className="todos-list">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p>
                  {filter === 'done' ? "No completed tasks yet" :
                   filter === 'active' ? "No active tasks — you're all caught up!" :
                   "No tasks here"}
                </p>
              </div>
            ) : (
              filtered.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            )}
          </div>

          {doneCount > 0 && (
            <div className="footer-actions">
              <button className="clear-btn" onClick={clearCompleted}>
                Clear {doneCount} completed
              </button>
            </div>
          )}

        </div>
      </div>
    </TodoProvider>
  )
}

export default App
