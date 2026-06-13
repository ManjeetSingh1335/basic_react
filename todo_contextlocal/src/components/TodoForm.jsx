import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext.js'

function TodoForm() {
  const [todo, setTodo] = useState("")
  const { addTodo } = useTodo()

  const add = (e) => {
    e.preventDefault()
    if (todo.trim() === "") return
    addTodo({ todo: todo.trim(), completed: false })
    setTodo("")
  }

  return (
    <form onSubmit={add} className="todo-form">
      <div className="input-wrapper">
        <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <input
          type="text"
          placeholder="What needs to be done?"
          className="todo-input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          maxLength={120}
        />
      </div>
      <button type="submit" className="add-btn" disabled={todo.trim() === ""}>
        Add Task
      </button>
    </form>
  )
}

export default TodoForm