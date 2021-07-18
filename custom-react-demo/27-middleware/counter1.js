import { ADD1, DESC1 } from './store/action-types.js'
const { createElement } = CustomReact

export default function Count1() {
  const dispatch = CustomReactRedux.useDispatch()
  const count1 = CustomReactRedux.useSelector(store => store.counter1)

  return createElement(
    'div',
    {},
    createElement('h1', {}, 'counter1 ' + count1.count),
    createElement('button', {
      onClick: () => {
        // thunk
        // dispatch((next) => {
        //   setTimeout(() => {
        //     next({
        //       type: ADD1,
        //       payload: 5
        //     })
        //   }, 3000)
        // })

        dispatch(new Promise(resolve => {
          console.log(1)
          setTimeout(() => {
            resolve({
              type: ADD1,
              payload: 5
            })
          }, 3000)
        }))
      }
    }, 'count1 加一'),
    createElement('button', {
      onClick: () => {
        dispatch({
          type: DESC1,
          payload: 10
        })
      }
    }, 'count1 减一'),
  )
}