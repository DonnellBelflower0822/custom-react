import { connect } from 'react-redux';
import { ADD2, DESC2 } from './store/action-types';

function Counter2(props) {
  return (
    <div>
      <h2>Counter2</h2>
      <p>{props.name}</p>
      <p onClick={() => {
        props.add(2)
      }}>{props.age}</p>
      <hr />
    </div>
  )
}

export default connect(
  (state) => (state.counter2),
  (dispatch) => ({
    add(payload = 1) {
      dispatch({
        type: ADD2,
        payload
      })
    },
    desc(payload = 1) {
      dispatch({
        type: DESC2,
        payload
      })
    }
  })
)(Counter2)