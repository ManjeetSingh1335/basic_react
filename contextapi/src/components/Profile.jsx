import React, { useContext } from 'react'
import UserContext from '../context/UserContext.js'

function Profile() {
  const { user } = useContext(UserContext)
  if (!user) {
    return <h2>Please login to view your profile</h2>
  }
  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.username}</p>
    </div>
  )
}

export default Profile
