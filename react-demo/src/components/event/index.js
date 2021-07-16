// export default function Click() {
//   function click(e) {
//     debugger
//   }
//   return (
//     <button onClick={click}>
//       按钮
//     </button>
//   )
// }

import React from 'react';

export default class Click extends React.PureComponent {
  click(e) {
    console.log(e, this)
  }
  render() {
    return (
      <button onClick={this.click}>按钮</button>
    )
  }
}