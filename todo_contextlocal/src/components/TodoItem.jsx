import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext.js'

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const { updateTodo, deleteTodo, toggleComplete } = useTodo()

  const editTodo = () => {
    if (todoMsg.trim() === "") return
    updateTodo(todo.id, { ...todo, todo: todoMsg.trim() })
    setIsTodoEditable(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") editTodo()
    if (e.key === "Escape") {
      setTodoMsg(todo.todo)
      setIsTodoEditable(false)
    }
  }

  const toggleCompleted = () => toggleComplete(todo.id)

  return (
    <div className={`todo-item ${todo.completed ? "todo-item--done" : ""} ${isTodoEditable ? "todo-item--editing" : ""}`}>
      <label className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <span className="checkbox-custom">
          {todo.completed && (
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
      </label>

      <input
        type="text"
        className={`todo-text ${todo.completed ? "todo-text--done" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        onKeyDown={handleKeyDown}
        readOnly={!isTodoEditable}
      />

      {isTodoEditable && (
        <span className="edit-hint">Enter to save · Esc to cancel</span>
      )}

      <div className="todo-actions">
        {!todo.completed && (
          <button
            className={`action-btn ${isTodoEditable ? "action-btn--save" : "action-btn--edit"}`}
            onClick={() => {
              if (isTodoEditable) editTodo()
              else setIsTodoEditable(true)
            }}
            title={isTodoEditable ? "Save" : "Edit"}
          >
            {isTodoEditable ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            )}
          </button>
        )}

        <button
          className="action-btn action-btn--delete"
          onClick={() => deleteTodo(todo.id)}
          title="Delete"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TodoItem