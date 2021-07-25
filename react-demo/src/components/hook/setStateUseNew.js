import React from 'react'
export default function App() {
  const [count, setCount] = React.useState(0)
  const countRef = React.useRef()
  // const countRef = React.createRef()

  React.useEffect(() => {
    countRef.current = count
  })

  function handler() {
    setCount(count + 1)
    setTimeout(() => {
      console.log(count)  // 0
      console.log(countRef.current)  // 永远是最新值
    }, 3000)
  }

  // 页面最后显示的是1
  return (
    <div>
      <p>{count}</p>
      <button onClick={handler}>+</button>
    </div>
  )
}