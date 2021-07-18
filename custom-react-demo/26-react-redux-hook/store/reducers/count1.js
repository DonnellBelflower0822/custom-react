import { ADD1, DESC1 } from '../action-types.js'

// 初始化
const initalState = { count: 10 }

const counter1 = (state = initalState, action) => {
  switch (action.type) {
    case ADD1:
      return { count: state.count + action.payload }
    case DESC1:
      return { count: state.count - action.payload }
    default:
      return state
  }
}

export default counter1