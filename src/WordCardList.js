import React, { useState, useEffect } from 'react'
import axios from 'axios'
import WordCard from './WordCard'
import "./wordcardlist.css"
import URL from './urls'
import { useSelector, useDispatch } from 'react-redux'
import { setOnPage, setInitial, setCurrentPage, setCurrentPageTo } from './wordSlice'
function WordCardList() {
  const { loggedIn } = useSelector(state => state.user)
  const { totalKnown, totalKnownOnPage, currentPage } = useSelector(state => state.word)
  const dispatch = useDispatch()
  const [wordList, setWordList] = useState([]);
  const [pageInput, setPageInput] = useState('');
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
            lower: (currentPage - 1) * 100 || 0,
            upper: parseInt((currentPage - 1) * 100 || 0) + 100
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
          lower: (currentPage - 1) * 100 || 0,
          upper: parseInt((currentPage - 1) * 100 || 0) + 100
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
  }, [currentPage]);

  useEffect(() => {
    WordData()
  }, [])

  const nextHandler = (event) => {
    event.preventDefault()
    dispatch(setCurrentPage(1))
  }
  const prvHandler = (event) => {
    event.preventDefault()
    if (currentPage > 1) {
      dispatch(setCurrentPage(-1))
      return
    }

  }
  const localStorageClear = (event) => {
    event.preventDefault()
    localStorage.clear()
    window.location.reload()
  }
  const formOnSubmitHandler = (event) => {
    event.preventDefault()
    if (pageInput !== "") {
      dispatch(setCurrentPageTo(pageInput))
      setPageInput(1)
    }
  }
  return (
    <>
      <form onSubmit={formOnSubmitHandler}>
        <input value={pageInput} onChange={e => setPageInput(e.target.value)} type="number" max="323" min="1"></input>
        <button type="submit">Go to Page</button>
      </form>
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
