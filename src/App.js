import React from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import Header from './Header'
import WordCardList from './WordCardList'
import Register from './Register'
import Login from './Login'
function App() {
  
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
          <Route path="/">
            <WordCardList />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
