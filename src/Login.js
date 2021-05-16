import React, { useState } from "react";
import axios from "axios";
import URL from "./utils/urls";
import { logging_in } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentPageTo } from "./redux/wordSlice";
import "./Login.css";
import { Button } from "@material-ui/core";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (username.trim() == "") {
      window.alert("username must not be Empty");
      return;
    }
    if (password.trim() == "") {
      window.alert("password must not be Empty");
      return;
    }
    let user = {
      username,
      password,
    };
    axios
      .post(`${URL}/login`, user)
      .then((res) => {
        dispatch(logging_in({ username }));
        localStorage.setItem("token", res.data.token);
        setPassword("");
        setUsername("");
        history.push("/");
        dispatch(setCurrentPageTo(1));
      })
      .catch((err) => {
        if (err.response.data.message == "no_user_found") {
          alert("No user found with that username");
        } else if (err.response.data.message == "wrong_password") {
          alert("Wrong Password");
        } else {
          alert("something is wrong");
        }
      });
  };
  const usernameChange = (event) => {
    setUsername(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="login_page">
        <h1>Login</h1>
        <div>
          <form method="POST" onSubmit={onSubmitHandler}>
            <div className="box">
              <input
                value={username}
                placeholder="username"
                onChange={usernameChange}
                name="username"
              />
              <input
                placeholder="password"
                value={password}
                onChange={passwordChange}
                name="password"
                type="password"
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
