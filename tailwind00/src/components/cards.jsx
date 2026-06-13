import React from 'react'

function Cards(props) {
  console.log(props.pokemon);
  console.log(props.channel);
  console.log(props.array);
  return (
    <div>
      <div className="bg-blue-300 text-center">Hello, Tailwind!{props.pokemon}</div>
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
  <div className="relative w-80 rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 p-1 shadow-2xl transition-transform hover:scale-105">
    
    <div className="bg-slate-50 rounded-xl overflow-hidden">
      
      <div className="flex justify-between items-center px-4 pt-3">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Flarigon</h2>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">HP</span>
          <span className="text-xl font-bold text-red-600">120</span>
          <div className="w-5 h-5 bg-orange-500 rounded-full border border-orange-700 shadow-inner"></div>
        </div>
      </div>

      <div className="mx-3 mt-2 border-4 border-yellow-400 shadow-md overflow-hidden rounded-sm bg-slate-200">
        <img src="https://imgs.search.brave.com/F5eJbE2nI2biZw9yC6f-p7FEJqe9TckXL_hHFjIr8Ek/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMucG9rZW1vbnBl/dHMuY29tL2ltYWdl/cy9tb25zdGVycy1p/bWFnZXMtODAwLTgw/MC8yMTM2LVNoaW55/LUZsYXJlb24ud2Vi/cA" alt="Pokemon" className="w-full h-48 object-cover" />
      </div>

      <div className="mx-6 -mt-2 relative z-10 bg-gradient-to-r from-yellow-200 to-yellow-400 py-0.5 px-4 italic text-[10px] text-center border border-yellow-600 shadow-sm">
        Flame Pokémon. Length: 3' 11", Weight: 55 lbs.
      </div>

      <div className="px-4 py-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            <span className="font-semibold text-slate-800">Ember Tail</span>
          </div>
          <span className="font-bold text-slate-700">30</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              </div>
              <span className="font-semibold text-slate-800">Magma Burst</span>
            </div>
            <span className="font-bold text-slate-700">80+</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-tight">
            Flip a coin. If heads, this attack does 20 more damage and the Defending Pokémon is now Burned.
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 flex justify-between text-[10px] font-bold text-slate-600">
        <div>
          <p>weakness</p>
          <div className="w-4 h-4 bg-blue-400 rounded-full mt-1"></div>
        </div>
        <div>
          <p>resistance</p>
          <div className="text-lg">-</div>
        </div>
        <div>
          <p>retreat cost</p>
          <div className="flex gap-1 mt-1">
            <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Cards
