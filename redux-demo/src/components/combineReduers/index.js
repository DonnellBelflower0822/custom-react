import React from 'react';
import store from './store';

export default class Base extends React.Component {
  state = {
    // 初始化
    name: store.getState().counter1.name,
    age: store.getState().counter1.age,
    name_1: store.getState().counter2.name,
    age_1: store.getState().counter2.age,
  }

  render() {
    return (
      <div>
        <h1>counter1.name --- {this.state.name}</h1>
        <h1>counter1.age --- {this.state.age}</h1>
        <h1>counter2.name --- {this.state.name_1}</h1>
        <h1>counter2.age --- {this.state.age_1}</h1>
      </div>
    )
  }
}