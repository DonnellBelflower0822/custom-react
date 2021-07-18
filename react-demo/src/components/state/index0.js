import React from 'react';

export default class Click extends React.PureComponent {
  state = {
    count: 1
  }
  click = () => {
    console.log(this.state.count)
    this.setState({
      count: 2
    })
    console.log(this.state.count)
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
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