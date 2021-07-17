import React from 'react';

export default class Click extends React.PureComponent {
  state = {
    count: 1
  }
  click = () => {
    console.log(this.state.count)
    this.setState({
      count: this.state.count + 1
    })
    console.log(this.state.count)
    this.setState({
      count: this.state.count + 1
    })
    console.log(this.state.count)
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