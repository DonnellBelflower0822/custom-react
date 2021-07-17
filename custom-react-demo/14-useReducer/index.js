const ADD = 'ADD'
const DESC = 'DESC'
function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { number: state.number + (action.payload || 1) }
    case DESC:
      return { number: state.number - 1 }
    default:
      return state
  }
}
function App() {
  const [state, dispatch] = CustomReact.useReducer(reducer, { number: 1 })

  return (
    CustomReact.createElement(
      'div',
      null,
      [
        CustomReact.createElement('div', null, state.number),
        CustomReact.createElement('button', {
          onClick: () => {
            dispatch({
              type: ADD,
              payload: 2
            })
          }
        }, '+1'),
        CustomReact.createElement('button', {
          onClick: () => {
            dispatch({
              type: DESC
            })
          }
        }, '-1'),
      ]
    )
  )
}

CustomReact.render(
  CustomReact.createElement(App),
  document.getElementById('root')
)