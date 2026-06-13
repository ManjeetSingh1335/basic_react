import { useState } from 'react'  

function App() {
  const [color, setcolor] = useState("skyblue")

  return (
    <>
      <div className="w-full h-screen duration-200" 
      style={{ backgroundColor: color }}>
        <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
          <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
            <button onClick={() => setcolor("skyblue")} className="w-10 h-10 rounded-full bg-sky-400 shadow-lg" ></button>
            <button onClick={() => setcolor("pink")} className="w-10 h-10 rounded-full bg-pink-400 shadow-lg"></button>
            <button onClick={() => setcolor("purple")} className="w-10 h-10 rounded-full bg-purple-400 shadow-lg"></button>
            <button onClick={() => setcolor("green")} className="w-10 h-10 rounded-full bg-green-400 shadow-lg"></button>
            <button onClick={() => setcolor("yellow")} className="w-10 h-10 rounded-full bg-yellow-400 shadow-lg"></button>
          </div>
        </div>
        
      </div>

    </>
  )
}

export default App
