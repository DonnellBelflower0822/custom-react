import React from 'react';

export default class Life extends React.Component {
  constructor(props) {
    super(props)
    console.log('constructor')
    this.state = {
      count: 1
    }
  }

  UNSAFE_componentWillMount() {
    console.log('componentWillMount', '将要挂载')
  }

  componentDidMount() {
    console.log('componentDidMount', '挂载完毕')
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 是否要更新
    console.log('shouldComponentUpdate', '是否需要更新', nextProps, nextState)
    return true
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate', '将要更新', nextProps, nextState)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', '更新完毕', prevProps, prevState)
  }

  render() {
    console.log('render')
    return <div>
      <p>{this.state.count}</p>
      <button onClick={() => {
        this.setState({
          count: this.state.count + 1
        })
        // this.forceUpdate()
      }}>按钮</button>
    </div>
  }
}