import React from 'react'
export default function App() {
  const [number, setNumber] = React.useState(0)

  return (
    <div>
      <p>{number}</p>
      <button onClick={() => {
        setNumber(number + 1)
      }}>按钮</button>
    </div>
  )
}