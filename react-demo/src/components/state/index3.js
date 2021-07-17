import React from 'react';

export default class Click extends React.PureComponent {
  state = {
    count: 1
  }
  click = () => {
    for (let i = 0;i < 5;i += 1) {
      setTimeout(() => {
        console.log('before', this.state.count)
        this.setState({
          count: this.state.count + 1
        }, () => {
          console.log('callback1', this.state.count)
        })
        console.log('after', this.state.count)
      }, 1000);
    }
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