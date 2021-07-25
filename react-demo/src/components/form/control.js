import React from 'react';

export default function Form() {
  const [value, setValue] = React.useState('')
  function onSubmit(e) {
    e.preventDefault();
    console.log(value)
  }
  return (
    <form onSubmit={onSubmit}>
      <label>
        名字:
        <input
          type='text'
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
      </label>
      <button type='submit'>提交</button>
    </form>
  )
}