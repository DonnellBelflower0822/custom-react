import React from 'react';

export default class Click extends React.PureComponent {
  state = {
    count: 1
  }
  click = () => {
    console.log('1-', this.state.count)
    this.setState({
      count: this.state.count + 1
    }, () => {
      console.log('callback 1', this.state.count)
    })
    console.log('2-', this.state.count)
    this.setState({
      count: this.state.count + 1
    }, () => {
      console.log('callback 2', this.state.count)
    })
    console.log('3-', this.state.count)
  }
  render() {
    const { count } = this.state
    console.log('render')
    return (
      <>
        <p>{count}</p>
        <button onClick={this.click}>按钮</button>
      </>
    )
  }
}