export default function Home(props) {
  return (<div>
    Home
    <button onClick={()=>{
      props.history.push('/about')
    }}>去关于页</button>
  </div>)
}