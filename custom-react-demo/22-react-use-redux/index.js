const ADD = 'ADD'
const DESC = 'DESC'

function reducer(state = { number: 20 }, action) {
  switch (action.type) {
    case ADD:
      return { number: state.number + 1 }
    case DESC:
      return { number: state.number - 1 }
    default:
      return state
  }
}

const store = CustomRedux.createStore(reducer, { number: 10 })

const { createElement, Component } = CustomReact
class App extends Component {
  state = {
    number: store.getState().number
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        number: store.getState().number
      })
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    return (
      createElement(
        'div',
        {},
        createElement('h1', {}, this.state.number),
        createElement('button', {
          onClick: () => {
            store.dispatch({ type: ADD })
          }
        }, '加一'),
        createElement('button', {
          onClick: () => {
            store.dispatch({ type: DESC })
          }
        }, '减一'),
      )
    )
  }
}

CustomReact.render(
  CustomReact.createElement(App),
  document.getElementById('root')
)