import React, { useEffect } from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import Header from './Header'
import WordCardList from './WordCardList'
import Register from './Register'
import Login from './Login'
import Profile from './Profile'
import { useDispatch } from 'react-redux'
import { logging_in } from './redux/userSlice'
import URL from './utils/urls'
import axios from 'axios'
function App() {
  const dispatch = useDispatch()
  useEffect(async () => {
    let token = localStorage.getItem('token')
    if (token) {
      let result = await axios.get(`${URL}/user/login`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (result?.data?.username) {
        dispatch(logging_in(result.data.username))
      }
    }
  }, [])
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/register/">
            <Register />
          </Route>
          <Route path="/login/">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <WordCardList />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
