import { ADD2, DESC2 } from './store/action-types.js'
const { createElement } = CustomReact

export default function Count2() {
  const dispatch = CustomReactRedux.useDispatch()
  const count2 = CustomReactRedux.useSelector(store => store.counter2)

  return createElement(
    'div',
    {},
    createElement('h2', {}, 'counter2 ' + count2.count),
    createElement('button', {
      onClick: () => {
        dispatch({
          type: ADD2,
          payload: 5
        })
      }
    }, 'count2 加一'),
    createElement('button', {
      onClick: () => {
        dispatch({
          type: DESC2,
          payload: 10
        })
      }
    }, 'count2 减一'),
  )
}