import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../features/todo/todoSlice'

function Todos() {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4 px-1">
        {todos.length} {todos.length === 1 ? 'task' : 'tasks'} remaining
      </h2>

      {todos.length === 0 && (
        <div className="text-center py-16 text-gray-600 text-sm">
          Nothing here yet — add a task above ↑
        </div>
      )}

      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="group flex justify-between items-center bg-gray-900 border border-gray-800 hover:border-gray-700 px-5 py-3.5 rounded-xl transition-all duration-150"
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
              <span className="text-gray-200 text-sm">{todo.text}</span>
            </div>
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="opacity-0 group-hover:opacity-100 ml-4 p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
              aria-label="Remove todo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todos