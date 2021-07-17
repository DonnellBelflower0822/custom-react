function Hello() {
  return CustomReact.createElement(
    'div',
    {
      className: 'title',
      style: { color: 'red' }
    },
    CustomReact.createElement('span', null, 'hello'),
    'world'
  )
}

class Counter extends CustomReact.Component {
  constructor(props) {
    super(props)
    this.state = { number: 1 }
  }

  // click = () => {
  //   console.log(1)
  //   this.setState({
  //     number: this.state.number + 1
  //   }, () => {
  //     console.log('callback 1', this.state.number)
  //   })
  //   console.log(2)
  //   this.setState({
  //     number: this.state.number + 1
  //   }, () => {
  //     console.log('callback 2', this.state.number)
  //   })
  //   console.log(3)
  // }

  click = () => {
    for (let i = 0;i < 3;i += 1) {
      setTimeout(() => {
        console.log('before', this.state.number)
        this.setState({
          count: this.state.number + 1
        }, () => {
          console.log('callback1', this.state.number)
        })
        console.log('after', this.state.number)
      }, 1000);
    }
  }

  render() {
    console.log('render')
    const { number } = this.state
    return CustomReact.createElement('div', {}, [
      CustomReact.createElement(Hello, {}),
      CustomReact.createElement('p', {}, 'hello ' + number),
      CustomReact.createElement(
        'button',
        {
          onClick: this.click
        },
        CustomReact.createElement('span', {}, '按钮')
      )
    ])
  }
}

CustomReact.render(CustomReact.createElement(Counter), document.getElementById('root'))
