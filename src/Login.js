import React, { useState } from 'react'
import axios from 'axios'
import URL from './urls'
import jwt from 'jwt-decode'
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    let user = {
      username,
      password
    }
    axios.post(`${URL}/login`, user)
      .then(res => {
        let data = jwt(res.data.token)
        localStorage.setItem(res.data.token, 'token')
      })
  }
  const usernameChange = (event) => {
    setUsername(event.target.value)
  }
  const passwordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <>
      <div>
        <form method="POST" onSubmit={onSubmitHandler}>
          <label>Username:
        <input value={username} onChange={usernameChange} name="username" />
          </label>
          <label>Password:
        <input value={password} onChange={passwordChange} name="password" type="password" />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
