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
    console.log('constructor')
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    return nextState.number % 2 === 0
  }

  componentWillUpdate() {
    console.log('componentWillUpdate')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  click = () => {
    this.setState({
      number: this.state.number + 1
    })
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
