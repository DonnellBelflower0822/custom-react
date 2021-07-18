import React from 'react'
export default function App() {
  const [count, setCount] = React.useState(0)
  const ref = React.useRef()

  React.useEffect(() => {
    ref.current = count
    setTimeout(() => {
      console.log(ref.current)
    }, 3000);
  })

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => {
        setCount(count + 1)
      }}>+</button>
    </div>
  )
}