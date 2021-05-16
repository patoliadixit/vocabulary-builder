import React, { createContext, useReducer, useContext } from 'react'
const totalKnownContext = createContext()
let totalKnownItemsInLocalStorage = 0
let totalUnknownItemsInLocalStorage = 0
let totalKnownOnPage = 0
let totalUnknownOnPage = 0

Object.values(localStorage).forEach(val => {
  if (val === "word_card_known") {
    totalKnownItemsInLocalStorage++
  }
  if (val === "word_card_unknown") {
    totalUnknownItemsInLocalStorage++
  }
})
const initialState = {
  totalKnown: totalKnownItemsInLocalStorage,
  totalUnknown: totalUnknownItemsInLocalStorage,
  totalKnownOnPage,
  totalUnknownOnPage
}
const increaseOneKnown = "increaseOneKnown"
const decreaseOneKnown = "decreaseOneKnown"
const increaseOneUnknown = "increaseOneUnknown"
const decreaseOneUnknown = "decreaseOneUnknown"
const setOnPage = "setOnPage"
const clearAll = "clearAll"
const reducer = (state, action) => {
  switch (action.type) {
    case increaseOneKnown:
      return {
        ...state,
        totalKnownOnPage: state.totalKnownOnPage + 1,
        totalKnown: state.totalKnown + 1
      }
    case decreaseOneKnown:
      return {
        ...state,
        totalKnownOnPage: (state.totalKnownOnPage > 0) && (state.totalKnownOnPage - 1),
        totalKnown: (state.totalKnown > 0) && (state.totalKnown - 1)
      }
    case increaseOneUnknown:
      return {
        ...state,
        totalUnknownOnPage: state.totalUnknownOnPage + 1,
        totalUnknown: state.totalUnknown + 1
      }
    case decreaseOneUnknown:
      return {
        ...state,
        totalUnknownOnPage: (state.totalUnknownOnPage > 0) && (state.totalUnknownOnPage - 1),
        totalUnknown: (state.totalUnknown > 0) && (state.totalUnknown - 1)
      }
    case setOnPage:
      return {
        ...state,
        totalKnownOnPage: action.payload.totalKnownOnPage,
        totalUnknownOnPage: action.payload.totalUnknownOnPage
      }
    case clearAll:
      return {
        totalKnownOnPage: 0,
        totalUnknownOnPage: 0
      }

    default:
      throw new Error()
  }
}
const TotalKnownProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <totalKnownContext.Provider value={[state, dispatch]}>
      {children}
    </totalKnownContext.Provider>
  )
}
export const useTotalKnownContext = () => { return useContext(totalKnownContext) }
export { totalKnownContext, TotalKnownProvider }