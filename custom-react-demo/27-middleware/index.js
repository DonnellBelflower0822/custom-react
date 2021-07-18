import store from './store/index.js'
import Count1 from './counter1.js'
import Count2 from './counter2.js'

const { createElement, Component } = CustomReact

const { Provider } = CustomReactRedux

class App extends Component {
  render() {
    return (
      createElement(
        Provider,
        { store },
        createElement(
          'div',
          {},
          createElement(Count1),
          createElement(Count2),
        )
      )
    )
  }
}

CustomReact.render(
  CustomReact.createElement(App),
  document.getElementById('root')
)