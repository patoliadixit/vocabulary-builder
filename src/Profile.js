import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import URL from "./utils/urls";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { logging_out } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { setCurrentPageTo } from "./redux/wordSlice";
function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfileData(res.data));
  }, []);
  const deleteAccount = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .get(`${URL}/user/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(logging_out());
        history.push("/");
        dispatch(setCurrentPageTo(1));
      });
  };
  return (
    <div className="profile_container">
      <div>Username : {profileData.username}</div>
      <div>
        Total number of words that are known: {profileData.known_words?.length}
      </div>
      <div>
        Total number of words that are unknown:{" "}
        {profileData.unknown_words?.length}
      </div>
      <div>
        Total number of words that are yet to review:{" "}
        {32237 -
          profileData.unknown_words?.length -
          profileData.known_words?.length}
      </div>
      <Button variant="contained" color="secondary" onClick={deleteAccount}>
        Delete Account
      </Button>
    </div>
  );
}

export default Profile;
