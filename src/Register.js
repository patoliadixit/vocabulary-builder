import React, { useState } from "react";
import axios from "axios";
import URL from "./utils/urls";
import "./Register.css";
import { Button } from "@material-ui/core";
import { logging_in } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentPageTo } from "./redux/wordSlice";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (password !== confirmPassword) {
      window.alert("password must match");
      return;
    }
    let user = {
      username,
      password,
      confirmPassword,
    };
    axios
      .post(`${URL}/register`, user)
      .then((res) => {
        user = {
          username,
          password,
        };
        axios.post(`${URL}/login`, user).then((res) => {
          dispatch(logging_in({ username }));
          localStorage.setItem("token", res.data.token);
          history.push("/");
          dispatch(setCurrentPageTo(1));
        });
      })
      .catch((err) => {
        if (err.response.data.message == "user_already_exists") {
          alert(`user with username "${username}" already exists.`);
        } else alert("something is wrong");
      });
  };
  const usernameChange = (event) => {
    setUsername(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  return (
    <>
      <div className="register_page">
        <h1>Register</h1>
        <form method="POST" onSubmit={onSubmitHandler}>
          <div className="box">
            <div>
              <input
                placeholder="username"
                id="username"
                value={username}
                onChange={usernameChange}
                name="username"
              />
            </div>
            <div>
              <input
                placeholder="password"
                id="password"
                value={password}
                onChange={passwordChange}
                name="password"
                type="password"
              />
            </div>
            <div>
              <input
                placeholder="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={confirmPasswordChange}
                name="confirmPassword"
                type="password"
              />
            </div>
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
