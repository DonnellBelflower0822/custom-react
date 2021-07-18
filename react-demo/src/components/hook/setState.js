import React from 'react'
export default function App() {
  const [count, setCount] = React.useState(0)

  function handler() {
    for (let i = 0;i < 3;i += 1) {
      setTimeout(() => {
        // 由于函数组件都是一个闭包。
        // 获取不到最新的值，只能获取到“当时”的值
        console.log(count)  // 0
        setCount(count + 1)
      }, 3000);
    }
  }

  // 页面最后显示的是1
  return (
    <div>
      <p>{count}</p>
      <button onClick={handler}>+</button>
    </div>
  )
}