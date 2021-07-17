function Sub1() {
  const [number, setNumber] = CustomReact.useState(0)
  return (
    CustomReact.createElement(
      'div',
      null,
      [
        CustomReact.createElement('h1', {}, number),
        CustomReact.createElement('button', {
          onClick: () => {
            setNumber(number + 1)
          }
        }, 'button')
      ]
    )
  )
}

function Sub2() {
  const [number, setNumber] = CustomReact.useState(0)
  return (
    CustomReact.createElement(
      'div',
      null,
      [
        CustomReact.createElement('h1', {}, number),
        CustomReact.createElement('button', {
          onClick: () => {
            setNumber((number) => number + 1)
          }
        }, 'button')
      ]
    )
  )
}

function App() {
  return (
    CustomReact.createElement('div', {}, [
      CustomReact.createElement(Sub1),
      CustomReact.createElement(Sub2),
    ])
  )
}

CustomReact.render(
  CustomReact.createElement(App),
  document.getElementById('root')
)