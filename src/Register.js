import React, { useState } from 'react'
import axios from 'axios'
import URL from './urls'
import "./Register.css"
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (username.trim() == "") {
      window.alert("username must not be Empty")
      return
    }
    if (password.trim() == "") {
      window.alert("password must not be Empty")
      return
    }
    if (password !== confirmPassword) {
      window.alert("password must match")
      return
    }
    let user = {
      username,
      password,
      confirmPassword
    }
    axios.post(`${URL}/register`, user)
      .then(res => {
        setUsername("")
        setPassword("")
        setConfirmPassword("")
      })

  }
  const usernameChange = (event) => {
    setUsername(event.target.value)
  }
  const passwordChange = (event) => {
    setPassword(event.target.value)
  }
  const confirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }
  return (
    <>
      <div >
        <form method="POST" onSubmit={onSubmitHandler}>
          <div className="form_container">
            <div>
              <label htmlFor="username">Username:</label>
              <input id="username" value={username} onChange={usernameChange} name="username" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input id="password" value={password} onChange={passwordChange} name="password" type="password" />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input id="confirmPassword" value={confirmPassword} onChange={confirmPasswordChange} name="confirmPassword" type="password" />
            </div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
