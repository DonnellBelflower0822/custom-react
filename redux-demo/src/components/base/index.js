import React from 'react';
import store, { actionType } from './store';

export default class Base extends React.Component {
  state = {
    // 初始化
    name: store.getState().name,
    age: store.getState().age,
  }

  componentDidMount() {
    // 订阅
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        name: store.getState().name,
        age: store.getState().age,
      })
    })
  }

  componentWillUnmount() {
    // 取消订阅
    this.unsubscribe()
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h1>{this.state.age}</h1>
        <button onClick={() => {
          // 派发动作
          store.dispatch({ type: actionType.ADD })
        }}>+1</button>
        <button onClick={() => {
          store.dispatch({ type: actionType.DESC })
        }}>-1</button>
      </div>
    )
  }
}