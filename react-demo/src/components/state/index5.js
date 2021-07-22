import React from 'react';

// export default function Click() {
//   const [count, setCount] = React.useState(1)
//   return (
//     <>
//       <p>{count}</p>
//       <button
//         onClick={() => {
//           setCount(2)
//           setTimeout(() => {
//             // 输出1
//             // 每个函数组件是一个闭包
//             // count是事件触发时count当时的值
//             console.log(count)
//           })
//         }}
//       >按钮</button>
//     </>
//   )
// }

export default class Click extends React.Component {
  state = {
    count: 1
  }

  render() {
    const { count } = this.state
    return (
      <>
        <p>{count}</p>
        <button
          onClick={() => {
            this.setState({
              count: count + 1
            })
            setTimeout(() => {
              // 1
              console.log(count)

              // 2。通过this.state能拿到最新的值
              console.log(this.state.count)
            }, 1000)
          }}
        >按钮</button>
      </>
    )
  }
}