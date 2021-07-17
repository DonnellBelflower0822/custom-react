class Sub1 extends CustomReact.PureComponent {
  render() {
    console.log('sub1 render')
    return (
      CustomReact.createElement('div', {
      }, 'Sub1 ' + this.props.count)
    )
  }
}
class Sub2 extends CustomReact.PureComponent {
  render() {
    console.log('sub2 render')
    return (
      CustomReact.createElement('div', {}, 'Sub2 ' + this.props.count)
    )
  }
}

class App extends CustomReact.Component {
  state = { count1: 0, count2: 0 }
  render() {
    return (
      CustomReact.createElement(
        'div',
        null,
        [
          CustomReact.createElement(Sub1, { count: this.state.count1 }),
          CustomReact.createElement(Sub2, { count: this.state.count2 }),
          CustomReact.createElement('button', {
            onClick: () => {
              this.setState({
                count1: this.state.count1 + 1
              })
            }
          }, 'sub1 button'),
          CustomReact.createElement('button', {
            onClick: () => {
              this.setState({
                count2: this.state.count2 + 2
              })
            }
          }, 'sub2 button'),
        ]
      )
    )
  }
}
CustomReact.render(
  CustomReact.createElement(App),
  document.getElementById('root')
)