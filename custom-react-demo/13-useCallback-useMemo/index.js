function Sub({ data, handleClick }) {
  console.log('render Sub')
  return (
    CustomReact.createElement(
      'div',
      null,
      [
        CustomReact.createElement('button', {
          onClick: handleClick
        }, 'button ' + data.number)
      ]
    )
  )
}

const SubMemo = CustomReact.memo(Sub)

function App() {
  const [name, setName] = CustomReact.useState('allen')
  const [number, setNumber] = CustomReact.useState(0)

  const data = CustomReact.useMemo(() => ({ number }), [number])
  const handleClick = CustomReact.useCallback(() => {
    setNumber(number + 1)
  }, [number])

  console.log('render App')
  return (
    CustomReact.createElement(
      'div',
      null,
      [
        CustomReact.createElement('input', {
          value: name,
          oninput: (e) => setName(e.target.value)
        }),
        CustomReact.createElement(SubMemo, {
          data, handleClick
        })
      ]
    )
  )
}

CustomReact.render(
  CustomReact.createElement(App),
  document.getElementById('root')
)