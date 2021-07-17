import React from 'react'
export default function App() {
  const [count, setCount] = React.useState(0)
  const ref = React.useRef()

  React.useEffect(() => {
    ref.current = count
    setTimeout(() => {
      // 此时获取不到当时最新的值
      // console.log(count)
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