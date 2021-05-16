import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./header.css";
import { logging_out } from "./redux/userSlice";
import { setCurrentPageTo } from "./redux/wordSlice";
import { useSelector, useDispatch } from "react-redux";
function Header() {
  const { loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const logout_handler = (event) => {
    event.preventDefault();
    dispatch(logging_out());
    history.push("/");
    dispatch(setCurrentPageTo(1));
  };
  const homeButtonHandler = (event) => {
    event.preventDefault();
    history.push("/");
    dispatch(setCurrentPageTo(1));
  };
  return (
    <>
      <div className="header_class">
        <button className="header_buttons" onClick={homeButtonHandler}>
          Home
        </button>
        {loggedIn ? (
          <div>
            <button onClick={logout_handler} className="header_buttons">
              Logout
            </button>
            <button className="header_buttons">
              <Link to="/profile">Profile</Link>
            </button>{" "}
          </div>
        ) : (
          <div>
            <button className="header_buttons">
              <Link to="/login">Login</Link>
            </button>
            <button className="header_buttons">
              <Link to="/register">Register</Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
