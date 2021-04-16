import React, { useState, useEffect } from 'react'
import axios from 'axios'
import WordCard from './WordCard'
import "./wordcardlist.css"
import { useTotalKnownContext } from './context'
import URL from './urls'
function WordCardList() {
  const [state, dispatch] = useTotalKnownContext()
  const [wordList, setWordList] = useState([]);
  const [limit, setLimit] = useState();
  // const [knownOnPage, setKnownOnPage] = useState(0);
  let totalKnownOnPage = 0
  let totalUnknownOnPage = 0
  const setOnPage = "setOnPage"
  useEffect(() => {
    axios.get(`${URL}/word/list` || 'http://localhost:3001/word/list/', {
      params: {
        lower: limit || 0,
        upper: parseInt(limit || 0) + 100,
      }
    })
      .then((res) => {
        let received_data = [...res.data]
        received_data.forEach(val => {
          let result = localStorage.getItem(val.word)
          if (result === "word_card_known") {
            totalKnownOnPage++
          } else if (result === "word_card_unknown") {
            totalUnknownOnPage++
          }
          val['status'] = result || "word_card"
          val['expanded'] = false
        })
        dispatch({ type: setOnPage, payload: { totalKnownOnPage, totalUnknownOnPage } })
        setWordList(received_data)
      })
  }, [limit]);

  const nextHandler = (event) => {
    event.preventDefault()
    setLimit(prv => {
      console.log(prv)
      return (parseInt(prv || 0) + 100)
    })
  }
  const prvHandler = (event) => {
    event.preventDefault()
    setLimit(prv => {
      console.log(prv)
      let val = parseInt(prv || 0) >= 100 ? parseInt(prv || 0) - 100 : 0
      return (val)
    })
  }
  const localStorageClear = (event) => {
    event.preventDefault()
    localStorage.clear()
    window.location.reload()
  }

  return (
    <>
      <button onClick={localStorageClear}>Clear Local Storage</button>
      <button onClick={prvHandler}>Previous</button>
      TotalOnPage:{state.totalKnownOnPage}
      <button onClick={nextHandler}>Next</button>
      Total:{state.totalKnown}
      <div className="word_card_list">
        {wordList.map((elem) => (
          <WordCard WORD={elem} key={elem.rank} />
        ))}
      </div>
      <button onClick={prvHandler}>Previous</button>
      <button onClick={nextHandler}>Next</button>
    </>
  )
}

export default WordCardList
