import React from 'react'
export default function App() {
  const ref = React.createRef()
  // React.useEffect(() => {
  //   ref.current.style.transform = 'translate(500px)'
  //   ref.current.style.transition = '500ms'
  // }, [ref])

  React.useLayoutEffect(() => {
    // console.log('use Effect')
    ref.current.style.transform = 'translate(500px)'
    ref.current.style.transition = '500ms'
  }, [ref])

  const style = {
    width: '100px',
    height: '100px',
    backgroundColor: 'red'
  }
  return (
    <div style={style} ref={ref}></div>
  )
}