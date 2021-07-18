import React from 'react'

const ADD = 'ADD'
const DESC = 'DESC'
function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { number: state.number + (action.payload || 1) }
    case DESC:
      return { number: state.number - 1 }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, { number: 1 })

  return (
    <div >
      <div>{state.number}</div>
      <button onClick={() => {
        dispatch({
          type: ADD,
          payload: 2
        })
      }}>+2</button>
      <button onClick={() => {
        dispatch({
          type: DESC
        })
      }}>-1</button>
    </div>
  )
}