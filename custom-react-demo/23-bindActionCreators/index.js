const ADD = 'ADD'
const DESC = 'DESC'

function reducer(state = { number: 20 }, action) {
  switch (action.type) {
    case ADD:
      return { number: state.number + action.payload }
    case DESC:
      return { number: state.number - action.payload }
    default:
      return state
  }
}

const store = CustomRedux.createStore(reducer, { number: 10 })

function add(payload = 1) {
  return { type: ADD, payload }
}
function desc(payload = 1) {
  return { type: DESC, payload }
}

const actionCreators = { add, desc }
const boundActions = CustomRedux.bindActionCreators(actionCreators, store.dispatch)

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
            boundActions.add(2)
          }
        }, '加一'),
        createElement('button', {
          onClick: () => {
            boundActions.desc(3)
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