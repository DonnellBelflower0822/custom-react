import React from 'react'

export default function App() {
  const intervalRef = React.useRef()
  React.useEffect(() => {
    intervalRef.current = setInterval(() => {
      // do some thing
    }, 100);
    return () => {
      clearInterval(intervalRef.current)
    }
  })

  function stop() {
    // 类似实例的属性
    clearInterval(intervalRef.current)
  }

  return (
    <div onClick={stop}>Hello</div>
  )
}