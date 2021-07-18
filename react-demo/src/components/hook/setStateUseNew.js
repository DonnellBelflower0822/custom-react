import React from 'react'
export default function App() {
  const [count, setCount] = React.useState(0)
  const ref = React.useRef(count)

  React.useEffect(() => {
    ref.current = count
    setTimeout(() => {
      console.log(ref.current)
    }, 3000);
  })

  function handler() {
    setCount(count + 1)
  }

  // 页面最后显示的是1
  return (
    <div>
      <p>{count}</p>
      <button onClick={handler}>+</button>
    </div>
  )
}