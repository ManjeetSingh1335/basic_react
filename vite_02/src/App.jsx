import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const[counter,setcounter]=useState(0);
  const addvalue=()=>{
    setcounter(counter+1);
    // setcounter(counter+1);
    // setcounter(counter+1);
    // setcounter(counter+1);
    // setcounter(counter+1);
    // setcounter((prev)=>prev+1);
    // setcounter((prev)=>prev+1);
    // setcounter((prev)=>prev+1);
    // setcounter((prev)=>prev+1);
    // setcounter((prev)=>prev+1);

  }
  const subvalue=()=>{
    setcounter(counter-1);
  }
  

  return (
    <>
      <h1>Hello ji !!</h1>
      <h2>counter value: {counter}</h2>
      <button onClick={addvalue}>Add value</button>
      <br />
      <button onClick={subvalue}>Subtract value</button>
    </>
  )
}

export default App
