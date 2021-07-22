import React from 'react'

export default function App() {
  const [state] = React.useState(10000)
  return (
    <>
      <input />
      <button>按钮</button>
      <ul>
        {
          new Array(state).fill(0).map((item, index) => (
            <li key={index}>{item}</li>
          ))
        }
      </ul>
    </>
  )
}