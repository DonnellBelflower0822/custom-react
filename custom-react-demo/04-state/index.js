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
    this.state = { number: 0 }
  }

  click = () => {
    const { number } = this.state
    this.setState({
      number: number + 1
    })
  }

  render() {
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
