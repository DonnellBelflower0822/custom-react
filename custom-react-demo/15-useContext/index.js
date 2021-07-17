const ADD = 'ADD'
const DESC = 'DESC'

const CounterContext = CustomReact.createContext()

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

function Counter() {
  const { state, dispatch } = CustomReact.useContext(CounterContext)
  return CustomReact.createElement(
    'div',
    null,
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
    }, '-1')
  )
}

function App() {
  const [state, dispatch] = CustomReact.useReducer(reducer, { number: 1 })
  console.log(state, dispatch)
  return (
    CustomReact.createElement(
      CounterContext.Provider,
      {
        value: {
          state,
          dispatch
        }
      },
      CustomReact.createElement(Counter)
    )
  )
}

CustomReact.render(
  CustomReact.createElement(App),
  document.getElementById('root')
)