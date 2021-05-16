import React, { useState } from "react";
import "./wordcard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseOneKnown,
  decreaseOneUnknown,
  increaseOneKnown,
  increaseOneUnknown,
} from "./redux/wordSlice";
import URL from "./utils/urls";
import axios from "axios";
function WordCard({ WORD }) {
  const [meaning, setMeaning] = useState(false);
  const [wordCardClasses, setWordCardClasses] = useState(WORD.status);
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.user);
  const expandMeaning = (event) => {
    event.preventDefault();
    setMeaning(!meaning);
  };
  const knownHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (loggedIn) {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let data = {
        word: WORD.word,
        rank: WORD.rank,
        status: "known",
      };
      axios.post(`${URL}/user/`, data, config);
      setWordCardClasses("word_card_known");
      if (WORD.status === "word_card_unknown") {
        WORD.status = "word_card_known";
        dispatch(increaseOneKnown());
        dispatch(decreaseOneUnknown());
      } else {
        WORD.status = "word_card_known";
        dispatch(increaseOneKnown());
      }
      return;
    }
    setWordCardClasses("word_card_known");
    let result = localStorage.getItem(WORD.word);
    if (result) {
      if (result === "word_card_unknown") {
        localStorage.setItem(WORD.word, "word_card_known");
        dispatch(increaseOneKnown());
        dispatch(decreaseOneUnknown());
      }
    } else {
      localStorage.setItem(WORD.word, "word_card_known");
      dispatch(increaseOneKnown());
    }
  };
  const unknownHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (loggedIn) {
      let data = {
        word: WORD.word,
        rank: WORD.rank,
        status: "unknown",
      };
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.post(`${URL}/user/`, data, config);
      setWordCardClasses("word_card_unknown");
      if (WORD.status === "word_card_known") {
        WORD.status = "word_card_unknown";
        dispatch(decreaseOneKnown());
        dispatch(increaseOneUnknown());
      } else {
        WORD.status = "word_card_unknown";
        dispatch(increaseOneUnknown());
      }
      return;
    }
    setWordCardClasses("word_card_unknown");
    let result = localStorage.getItem(WORD.word);
    if (result) {
      if (result === "word_card_known") {
        localStorage.setItem(WORD.word, "word_card_unknown");
        dispatch(decreaseOneKnown());
        dispatch(increaseOneUnknown());
      }
    } else {
      localStorage.setItem(WORD.word, "word_card_unknown");
      dispatch(increaseOneUnknown());
    }
  };
  const knownButtonText = () => {
    if (wordCardClasses === "word_card_unknown") {
      return ["I Know", false];
    }
    if (wordCardClasses === "word_card_known") {
      return ["Known", true];
    }
    return ["I know", false];
  };
  const unknownButtonText = () => {
    if (wordCardClasses === "word_card_known") {
      return ["Don't Know", false];
    }
    if (wordCardClasses === "word_card_unknown") {
      return ["Unknown", true];
    }
    return ["Don't Know", false];
  };
  return (
    <>
      <div className="word_card_with_meaning">
        <div className={wordCardClasses} onClick={expandMeaning}>
          <div className="word_rank no_highlight">
            <div className="word">{WORD.word}</div>
            <div className="rank">{WORD.rank}</div>
          </div>
          <div className="btns">
            <div className="known_button">
              <button
                disabled={knownButtonText()[1]}
                onClick={knownHandler}
                className="no_highlight"
              >
                {knownButtonText()[0]}
              </button>
            </div>
            <div className="unknown_button">
              <button
                disabled={unknownButtonText()[1]}
                onClick={unknownHandler}
                className="no_highlight"
              >
                {unknownButtonText()}
              </button>
            </div>
          </div>
        </div>
        {meaning && <div className="meaning">{WORD.meaning}</div>}
      </div>
    </>
  );
}

export default WordCard;
