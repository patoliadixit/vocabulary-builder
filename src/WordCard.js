import React, { useState } from 'react'
import "./wordcard.css"
import { useDispatch } from 'react-redux'
import { setOnPage, clearAll, decreaseOneKnown, decreaseOneUnknown, increaseOneKnown, increaseOneUnknown } from './wordSlice'

function WordCard({ WORD }) {
  const [meaning, setMeaning] = useState(false);
  const [wordCardClasses, setWordCardClasses] = useState(WORD.status);
  const [known, setKnown] = useState(WORD.status);
  const dispatch = useDispatch()
  const expandMeaning = (event) => {
    event.preventDefault()
    setMeaning(!meaning)
  }

  const knownHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setWordCardClasses("word_card_known")
    let result = localStorage.getItem(WORD.word)
    if (result) {
      if (result === "word_card_unknown") {
        localStorage.setItem(WORD.word, "word_card_known")
        dispatch(increaseOneKnown())
        dispatch(decreaseOneUnknown())
      }
    } else {
      localStorage.setItem(WORD.word, "word_card_known")
      dispatch(increaseOneKnown())
    }
  }

  const unknownHandler = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setWordCardClasses("word_card_unknown")
    let result = localStorage.getItem(WORD.word)
    if (result) {
      if (result === "word_card_known") {
        localStorage.setItem(WORD.word, "word_card_unknown")
        dispatch(decreaseOneKnown())
        dispatch(increaseOneUnknown())

      }
    } else {
      localStorage.setItem(WORD.word, "word_card_unknown")
      console.log("hi")
      dispatch(increaseOneUnknown())

    }
  }
  const buttonDisable = () => {
    switch (wordCardClasses) {
      case "word_card":
        return true
    }
  }
  const knownButtonText = () => {
    if (wordCardClasses === "word_card_unknown") {
      return "Yes I Know"
    }
    if (wordCardClasses === "word_card_known") {
      return "Known"
    }
    return "Yes I know"
  }
  const unknownButtonText = () => {
    if (wordCardClasses === "word_card_known") {
      return "Dunno"
    }
    if (wordCardClasses === "word_card_unknown") {
      return "Unknown"
    }
    return "Dunno"
  }
  return (
    <>
      <div className="word_card_with_meaning" >
        <div className={wordCardClasses} onClick={expandMeaning}>
          <div className="word_rank no_highlight" >
            <div className="word">
              {WORD.word}
            </div>
            <div className="rank">
              {WORD.rank}
            </div>
          </div>
          <div className="btns">
            <div className="known_button">
              <button onClick={knownHandler} className="no_highlight">{knownButtonText()}</button>
            </div>
            <div >
              <button onClick={unknownHandler} className="unknown_button no_highlight">{unknownButtonText()}</button>
            </div>
          </div>
        </div>
        {meaning &&
          <div className="meaning">
            {WORD.meaning}
          </div>}
      </div>
    </>
  )
}

export default WordCard
