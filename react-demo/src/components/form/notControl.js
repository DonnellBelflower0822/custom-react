import React from 'react';

class A extends React.Component {
  render() {
    return null
  }
}

console.log(<A />)

export default function Form() {
  const nameRef = React.createRef()
  function onSubmit(e) {
    e.preventDefault();
    // 通过input的ref获得dom,然后通过dom找到值
    console.log(nameRef.current.value)
  }
  return (
    <form onSubmit={onSubmit}>
      <label>
        名字:
        <input
          type='text'
          ref={nameRef}
        />
      </label>
      <button type='submit'>提交</button>
    </form>
  )
}