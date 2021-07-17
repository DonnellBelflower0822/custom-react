function Sub(props, ref) {
  const inputRef = CustomReact.useRef()

  CustomReact.useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus()
    }
  }))


  return CustomReact.createElement('input', {
    ref: inputRef
  })
}

const ForwardedSub = CustomReact.forwardRef(Sub)

function App() {
  const childRef = CustomReact.useRef()

  return (
    CustomReact.createElement(
      'div',
      {},
      CustomReact.createElement(ForwardedSub, { ref: childRef }),
      CustomReact.createElement('button', {
        onClick() {
          childRef.current.focus()
          // 直接可以干掉子级
          childRef.current.remove()
        }
      }, '按钮'),
    )
  )
}

CustomReact.render(
  CustomReact.createElement(App),
  document.getElementById('root')
)