import { useDispatch, useSelector } from 'react-redux';
import { ADD1 } from './store/action-types';

function Counter1() {
  const dispatch = useDispatch()
  const counter1 = useSelector(state => state.counter1)
  return (
    <div>
      <h2>Counter1</h2>
      <p>{counter1.name}</p>
      <p onClick={() => {
        dispatch({
          type: ADD1,
          payload: 4
        })
      }}>{counter1.age}</p>
      <hr />
    </div>
  )
}

export default Counter1
// export default connect((state) => (state.counter1))(Counter1)