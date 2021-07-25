import React from 'react'

function usePrevious(count) {
  const prevCountRef = React.useRef();
  React.useEffect(() => {
    prevCountRef.current = count
    debugger
  })
  return prevCountRef.current
}

export default function Request() {
  const [state, setState] = React.useState(0)
  const previousState = usePrevious(state)

  return (
    <div onClick={() => {
      console.log('上一次state', previousState)
      console.log('当前state', state)
      setState(state + 1)
    }}>{state}</div>
  )
}