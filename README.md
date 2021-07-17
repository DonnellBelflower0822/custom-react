# custom-react

## 目录
- custom-react-demo: 手写react的测试代码
- packages： 手写react的包
- react-demo： 真实react测试代码
- scripts：运行命令

## 一个功能一个提交


Object.freeze

## 批量更新
```js
state = {
  count: 1
}
click = () => {
  console.log(this.state.count) // 1
  this.setState({
    count: this.state.count + 1
  })
  console.log(this.state.count) // 1
  this.setState({
    count: this.state.count + 1
  })
  console.log(this.state.count) // 1
  this.setState({
    count: this.state.count + 1
  })
  console.log(this.state.count) // 1

  // 一次性渲染: this.state.count = 2
}
```

## classComponent
- setState设置跟原始数据一样不会更新
- setState的回调是在render之后调用
- 在事件和生命周期的setState同步代码会批量更新

```js
// 不会触发render更新
state = {
  count: 1
}
click = () => {
  console.log(this.state.count)
  this.setState({
    count: 1
  })
  console.log(this.state.count)
}
```

### 在非react

```js
export default class Click extends React.PureComponent {
  state = {
    count: 1
  }
  click = () => {
    for (let i = 0;i < 3;i += 1) {
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

// 破坏了react的批量更新，就变成同步执行
// before 1
// render
// callback1 2
// after 2
// before 2
// render
// callback1 3
// after 3
// before 3
// render
// callback1 4
// after 4
// before 4
// render
// callback1 5
// after 5
// before 5
// render
// callback1 6
// after 6
```

## useRef