import React from 'react'

// ref会作为函数组件第二个参数
function Sub(props, ref) {
  const inputRef = React.useRef()
  
  React.useImperativeHandle(ref, () => ({
    // 返回选择暴露给调用组件的方法/属性
    focus() {
      inputRef.current.focus()
    }
  }))

  return <input ref={inputRef} />
}

const ForwardedSub = React.forwardRef(Sub)

export default function App() {
  const childRef = React.useRef()

  return (
    <div>
      <ForwardedSub ref={childRef} />
      <button onClick={() => {
        childRef.current.focus()
        // 报错
        childRef.current.remove()
      }}>获得焦点</button>
    </div>
  )
}