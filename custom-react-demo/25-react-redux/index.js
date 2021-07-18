import store from './store/index.js'
import * as counter1 from './store/actions/count1.js'
// import * as counter2 from './store/actions/count2.js'
import { ADD2, DESC2 } from './store/action-types.js'
const { createElement, Component } = CustomReact

const { Provider, connect, connect2 } = CustomReactRedux

function Count1(props) {
  return createElement(
    'div',
    {},
    createElement('h1', {}, 'counter1 ' + props.count),
    createElement('button', {
      onClick: () => {
        props.add1(2)
      }
    }, 'count1 加一'),
    createElement('button', {
      onClick: () => {
        props.desc1(3)
      }
    }, 'count1 减一'),
  )
}
const ConnectedCount1 = connect2((state) => state.counter1, counter1)(Count1)

function Count2(props) {
  return createElement(
    'div',
    {},
    createElement('h2', {}, 'counter2 ' + props.count),
    createElement('button', {
      onClick: () => {
        props.add2(4)
      }
    }, 'count2 加一'),
    createElement('button', {
      onClick: () => {
        props.desc2(5)
      }
    }, 'count2 减一'),
  )
}
const ConnectedCount2 = connect((state) => state.counter2, (dispatch) => {
  return {
    add2(payload = 3) {
      dispatch({ type: ADD2, payload })
    },
    desc2(payload) {
      dispatch({ type: DESC2, payload })
    }
  }
})(Count2)

class App extends Component {
  render() {
    return (
      createElement(
        Provider,
        { store },
        createElement(
          'div',
          {},
          createElement(ConnectedCount1),
          createElement(ConnectedCount2),
        )
      )
    )
  }
}

CustomReact.render(
  CustomReact.createElement(App),
  document.getElementById('root')
)