import React from 'react';

export default function Click() {
  const [count, setCount] = React.useState(1)
  console.log('render')
  return (
    <>
      <p>{count}</p>
      <button onClick={() => {
        setCount(2)
      }}>按钮</button>
    </>
  )
}