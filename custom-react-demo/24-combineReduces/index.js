import store from './store/index.js'
import * as counter1 from './store/actions/count1.js'
import * as counter2 from './store/actions/count2.js'
const { createElement, Component } = CustomReact

const boundActions = CustomRedux.bindActionCreators({ ...counter1, ...counter2 }, store.dispatch)

class App extends Component {
  state = {
    count1: store.getState().counter1.count,
    count2: store.getState().counter2.count,
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        count1: store.getState().counter1.count,
        count2: store.getState().counter2.count
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
        createElement('h1', {}, 'counter1 ' + this.state.count1),
        createElement('button', {
          onClick: () => {
            boundActions.add1(2)
          }
        }, 'count1 加一'),
        createElement('button', {
          onClick: () => {
            boundActions.desc1(3)
          }
        }, 'count1 减一'),

        createElement('h2', {}, 'counter2 ' + this.state.count2),
        createElement('button', {
          onClick: () => {
            boundActions.add2(4)
          }
        }, 'count2 加一'),
        createElement('button', {
          onClick: () => {
            boundActions.desc2(5)
          }
        }, 'count2 减一'),
      )
    )
  }
}

CustomReact.render(
  CustomReact.createElement(App),
  document.getElementById('root')
)