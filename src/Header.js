import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css"
import { Button } from '@material-ui/core'
function Header() {
  return (
    <>
      <div className="header_class">
        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/login">
          Login
        </Button><Button component={Link} to="/register">
          Register
        </Button>
      </div>
    </>
  )
}

export default Header
