import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'

function AddTodo() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput('');
  }

  return (
    <form onSubmit={addTodoHandler} className="flex items-center gap-3 mt-12 w-full max-w-xl mx-auto">
      <input
        type="text"
        className="flex-1 bg-gray-900 rounded-xl border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 text-sm outline-none text-gray-100 py-3 px-4 placeholder-gray-500 transition-all duration-200 shadow-inner"
        placeholder="What needs to be done?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all duration-150 shadow-lg shadow-indigo-500/20 whitespace-nowrap"
      >
        + Add
      </button>
    </form>
  )
}

export default AddTodo