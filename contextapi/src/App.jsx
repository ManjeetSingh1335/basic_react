import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import UserContextProvider from './context/UserContext.jsx'
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'

function App() {

  return (
    <UserContextProvider>
      <h1>Welcome to Vite + React</h1>
      <Login />
      <Profile />

    </UserContextProvider>
  )
}

export default App
