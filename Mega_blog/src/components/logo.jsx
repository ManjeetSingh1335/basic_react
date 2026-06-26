import React from 'react'

function Logo({width = '100px'}){
  return(
    <div className="flex items-center gap-2 font-bold text-xl tracking-tight select-none">
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/25 text-white font-extrabold text-lg transform hover:scale-105 transition-transform duration-200">
        M
      </div>
      <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent font-extrabold">
        Mega<span className="text-indigo-400">Blog</span>
      </span>
    </div>
  )
}

export default Logo