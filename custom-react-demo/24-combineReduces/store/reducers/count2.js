import { ADD2, DESC2 } from '../action-types.js'

// 初始化
const initalState = { count: 20 }

const counter2 = (state = initalState, action) => {
  switch (action.type) {
    case ADD2:
      return { count: state.count + action.payload }
    case DESC2:
      return { count: state.count - action.payload }
    default:
      return state
  }
}

export default counter2