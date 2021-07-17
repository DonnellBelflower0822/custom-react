function App() {
  const [count, setCount] = CustomReact.useState(0)
  CustomReact.useEffect(() => {
    console.log('use Effect')
    const timer = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })
  return (
    CustomReact.createElement('div', {}, count)
  )
}

CustomReact.render(
  CustomReact.createElement(App),
  document.getElementById('root')
)