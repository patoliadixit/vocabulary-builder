import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Profile.css"
import URL from './urls'
import { Button } from '@material-ui/core';
function Profile() {
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get(`${URL}/user/profile`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setProfileData(res.data))
  }, [])
  const deleteAccount = (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    axios.get(`${URL}/user/delete/`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => console.log('deleted'))
  }
  return (
    <div className="profile_container">
      <div>Username : {profileData.username}</div>
      <div>Total Known Words: {profileData.known_words?.length}</div>
      <div>Total Words Not known: {profileData.unknown_words?.length}</div>
      <div>Total Words Not Reviewed: {32237 - profileData.unknown_words?.length - profileData.known_words?.length}</div>
      <Button variant="contained" color="secondary"
        onClick={deleteAccount}
      >Delete Account</Button>
    </div>
  )
}

export default Profile
