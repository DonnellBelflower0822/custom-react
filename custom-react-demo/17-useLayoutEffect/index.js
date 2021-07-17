function App() {
  const ref = CustomReact.useRef(null)
  
  CustomReact.useEffect(() => {
    ref.current.style.transform = 'translate(500px)'
    ref.current.style.transition = '500ms'
  }, [])

  // CustomReact.useLayoutEffect(() => {
  //   ref.current.style.transform = 'translate(500px)'
  //   ref.current.style.transition = '500ms'
  // }, [])

  const style = {
    width: '100px',
    height: '100px',
    backgroundColor: 'red'
  }
  return (
    CustomReact.createElement('div', { style, ref })
  )
}

CustomReact.render(
  CustomReact.createElement(App),
  document.getElementById('root')
)