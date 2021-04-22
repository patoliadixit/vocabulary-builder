import React, { useState, useEffect } from 'react'
import axios from 'axios'
import WordCard from './WordCard'
import "./wordcardlist.css"
import URL from './urls'
import { useSelector, useDispatch } from 'react-redux'
import { setOnPage, setInitial } from './wordSlice'
function WordCardList() {
  const { loggedIn } = useSelector(state => state.user)
  const { totalKnown, totalKnownOnPage } = useSelector(state => state.word)
  const dispatch = useDispatch()
  const [wordList, setWordList] = useState([]);
  const [limit, setLimit] = useState();
  let totalKnownOnPageNonState = 0
  let totalUnknownOnPageNonState = 0
  const WordData = () => {
    let totalKnownItemsInLocalStorage = 0
    let totalUnknownItemsInLocalStorage = 0
    if (loggedIn) {
      wordList.forEach(val => {
        if (val.status === "word_card_known") {
          totalKnownItemsInLocalStorage++
        }
        if (val.status === "word_card_unknown") {
          totalUnknownItemsInLocalStorage++
        }
      })
    }
    if (!loggedIn) {
      Object.values(localStorage).forEach(val => {
        if (val === "word_card_known") {
          totalKnownItemsInLocalStorage++
        }
        if (val === "word_card_unknown") {
          totalUnknownItemsInLocalStorage++
        }
      })
    }
    dispatch(setInitial({ totalKnown: totalKnownItemsInLocalStorage, totalUnknown: totalUnknownItemsInLocalStorage }))
  }
  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('token')
      axios.get(`${URL}/user/`,
        {
          params: {
            lower: limit || 0,
            upper: parseInt(limit || 0) + 100
          },
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          console.log(res.data)
          let received_data = [...res.data]
          received_data.forEach(val => {
            if (val.status === "known") {
              totalKnownOnPageNonState++
            } else if (val.status === "unknown") {
              totalUnknownOnPageNonState++
            }
            val['status'] = `word_card_${val.status}` || "word_card"
            val['expanded'] = false
          })
          dispatch(setOnPage({ totalKnownOnPage: totalKnownOnPageNonState, totalUnknownOnPage: totalUnknownOnPageNonState }))
          setWordList(received_data)
        })
    }
    if (!loggedIn) {
      axios.get(`${URL}/word/list`, {
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
              totalKnownOnPageNonState++
            } else if (result === "word_card_unknown") {
              totalUnknownOnPageNonState++
            }
            val['status'] = result || "word_card_"
            val['expanded'] = false
          })

          dispatch(setOnPage({ totalKnownOnPage: totalKnownOnPageNonState, totalUnknownOnPage: totalUnknownOnPageNonState }))
          setWordList(received_data)
        })
    }
  }, [limit]);

  useEffect(() => {
    WordData()
  }, [])

  const nextHandler = (event) => {
    event.preventDefault()
    setLimit(prv => {
      return (parseInt(prv || 0) + 100)
    })
  }
  const prvHandler = (event) => {
    event.preventDefault()
    setLimit(prv => {
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
      TotalOnPage:{totalKnownOnPage}
      <button onClick={nextHandler}>Next</button>
      Total:{totalKnown}
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
