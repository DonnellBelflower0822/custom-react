import React from 'react';
import store from './store';

import { bindActionCreators } from 'redux';

const actionType = {
  ADD: 'ADD',
  DESC: 'DESC',
}
const actionCreators = {
  add: (payload) => ({
    type: actionType.ADD,
    payload
  }),
  desc: (payload) => ({
    type: actionType.DESC,
    payload
  })
}

const boundActions = bindActionCreators(actionCreators, store.dispatch)

export default class Base extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h1>{this.state.age}</h1>
        <button onClick={() => {
          // 派发动作。简化不用传递type等
          boundActions.add(1)
        }}>+1</button>
        <button onClick={() => {
          boundActions.desc(2)
        }}>-1</button>
      </div>
    )
  }

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
}