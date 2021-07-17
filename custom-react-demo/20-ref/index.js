class Sub extends CustomReact.Component {
  render() {
    return CustomReact.createElement('input', {
    })
  }

}

function App() {
  const childRef = CustomReact.useRef()

  return (
    CustomReact.createElement(
      'div',
      {},
      CustomReact.createElement(Sub, { ref: childRef }),
      CustomReact.createElement('button', {
        onClick() {
          console.log(childRef)
        }
      }, '按钮'),
    )
  )
}

CustomReact.render(
  CustomReact.createElement(App),
  document.getElementById('root')
)