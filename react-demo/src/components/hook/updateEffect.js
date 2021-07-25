import React from 'react'

// 只有在更新时执行
function useUpdateEffect(updateFn) {
  const flagRef = React.useRef()

  React.useEffect(() => {
    if (!flagRef.current) {
      flagRef.current = true
    } else {
      updateFn()
    }
  })
}

export default function Request() {
  const [state, setState] = React.useState(0)
  useUpdateEffect(() => {
    console.log('update')
  })

  return (
    <div onClick={() => { setState(state + 1) }}>{state}</div>
  )
}