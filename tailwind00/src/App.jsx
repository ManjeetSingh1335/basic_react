import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Cards from './components/cards'


function App() {
  const [count, setCount] = useState(0);
  const pokemon={
    name:"Flarigon",
    hp:120,
    type:"Fire",
    length:"3' 11\"",
    weight:"55 lbs.",
    attacks:[
      {
        name:"Ember Tail",
        damage:30,
        cost:1
      },
      {
        name:"Magma Burst",
        damage:80,
        cost:2,
        description:"Flip a coin. If heads, this attack does 20 more damage and the Defending Pokémon is now Burned."
      }
    ],
    weakness:"Water",
    resistance:null,
    retreatCost:2 
  }
  let arr=[1,2,3,4,5];

  return (
    <>
      {/* <div class="min-h-screen bg-slate-900 flex items-center justify-center p-6">
  <div class="relative w-80 rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 p-1 shadow-2xl transition-transform hover:scale-105">
    
    <div class="bg-slate-50 rounded-xl overflow-hidden">
      
      <div class="flex justify-between items-center px-4 pt-3">
        <h2 class="text-xl font-bold text-slate-800 tracking-tight">Flarigon</h2>
        <div class="flex items-center gap-1">
          <span class="text-[10px] font-bold text-slate-500 uppercase">HP</span>
          <span class="text-xl font-bold text-red-600">120</span>
          <div class="w-5 h-5 bg-orange-500 rounded-full border border-orange-700 shadow-inner"></div>
        </div>
      </div>

      <div class="mx-3 mt-2 border-4 border-yellow-400 shadow-md overflow-hidden rounded-sm bg-slate-200">
        <img src="https://imgs.search.brave.com/F5eJbE2nI2biZw9yC6f-p7FEJqe9TckXL_hHFjIr8Ek/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMucG9rZW1vbnBl/dHMuY29tL2ltYWdl/cy9tb25zdGVycy1p/bWFnZXMtODAwLTgw/MC8yMTM2LVNoaW55/LUZsYXJlb24ud2Vi/cA" alt="Pokemon" class="w-full h-48 object-cover" />
      </div>

      <div class="mx-6 -mt-2 relative z-10 bg-gradient-to-r from-yellow-200 to-yellow-400 py-0.5 px-4 italic text-[10px] text-center border border-yellow-600 shadow-sm">
        Flame Pokémon. Length: 3' 11", Weight: 55 lbs.
      </div>

      <div class="px-4 py-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-200 pb-2">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-orange-500 rounded-full"></div>
            <span class="font-semibold text-slate-800">Ember Tail</span>
          </div>
          <span class="font-bold text-slate-700">30</span>
        </div>

        <div class="flex flex-col">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex gap-0.5">
                <div class="w-4 h-4 bg-orange-500 rounded-full"></div>
                <div class="w-4 h-4 bg-orange-500 rounded-full"></div>
              </div>
              <span class="font-semibold text-slate-800">Magma Burst</span>
            </div>
            <span class="font-bold text-slate-700">80+</span>
          </div>
          <p class="text-[11px] text-slate-500 mt-1 leading-tight">
            Flip a coin. If heads, this attack does 20 more damage and the Defending Pokémon is now Burned.
          </p>
        </div>
      </div>

      <div class="px-4 pb-4 flex justify-between text-[10px] font-bold text-slate-600">
        <div>
          <p>weakness</p>
          <div class="w-4 h-4 bg-blue-400 rounded-full mt-1"></div>
        </div>
        <div>
          <p>resistance</p>
          <div class="text-lg">-</div>
        </div>
        <div>
          <p>retreat cost</p>
          <div class="flex gap-1 mt-1">
            <div class="w-3 h-3 bg-slate-300 rounded-full"></div>
            <div class="w-3 h-3 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div> */}
      <h1 className='bg-green-400 text-white p-4 rounded-xl mb-4'>Tailwind, hello</h1>
      <Cards pokemon={pokemon} channel="Tailwind" array={arr} />
    </>
  )
}

export default App
