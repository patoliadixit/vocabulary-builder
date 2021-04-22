import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./header.css"
import { Button } from '@material-ui/core'
import { logging_out } from './userSlice'
import { setCurrentPageTo } from './wordSlice'
import { useSelector, useDispatch } from 'react-redux'
function Header() {
  const { loggedIn } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const logout_handler = (event) => {
    event.preventDefault()
    dispatch(logging_out())
    history.push('/')
    window.location.reload()
  }
  const homeButtonHandler = (event) => {
    event.preventDefault()
    history.push('/')
    dispatch(setCurrentPageTo(1))
  }
  return (
    <>
      <div className="header_class">
        <Button onClick={homeButtonHandler} to="/">
          Home
        </Button>
        {loggedIn ?
          <Button onClick={logout_handler}>Logout</Button> :
          <>
            <Button component={Link} to="/login">
              Login
        </Button>
            <Button component={Link} to="/register">
              Register
        </Button></>
        }
      </div>
    </>
  )
}

export default Header
