export default function About(props) {
  return (<div>About
    <button onClick={() => {
      props.history.goBack()
    }}>回退</button>

  </div>)
}