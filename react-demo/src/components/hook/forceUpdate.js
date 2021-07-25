import React from 'react'

function useForceUpdate() {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0)
  return forceUpdate
}

export default function Request() {
  const forceUpdate = useForceUpdate()
  console.log('更新')
  return (
    <div onClick={forceUpdate}>11</div>
  )
}