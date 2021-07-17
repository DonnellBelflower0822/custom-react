class Counter extends CustomReact.Component {
  constructor(props) {
    super(props)
    this.state = { number: 1 }
    console.log('Parent constructor')
  }

  componentWillMount() {
    console.log('Parent componentWillMount')
  }

  componentDidMount() {
    console.log('Parent componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Parent shouldComponentUpdate')
    return nextState.number % 2 === 0
  }

  componentWillUpdate() {
    console.log('Parent componentWillUpdate')
  }

  componentDidUpdate() {
    console.log('Parent componentDidUpdate')
  }

  click = () => {
    this.setState({
      number: this.state.number + 1
    })
  }

  render() {
    console.log('Parent render')
    const { number } = this.state
    return CustomReact.createElement('div', {}, [
      CustomReact.createElement('h1', null, `parent ${number}`),
      number !== 4 ? CustomReact.createElement(Sub, { number }) : null,
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
