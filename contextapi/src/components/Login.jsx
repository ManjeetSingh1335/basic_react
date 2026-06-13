import React from 'react'
import { useState, useContext } from 'react'
import UserContext from '../context/UserContext.js'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { setUser } = useContext(UserContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    setUser({ username, password })
  }

  return (
    <div>
        <h2>Login</h2>

        <input type="text"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        placeholder='Username' />
        {"  "}
        <input type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder='Password' />

        <button onClick={handleSubmit}>Login</button>
      
    </div>
  )
}

export default Login
