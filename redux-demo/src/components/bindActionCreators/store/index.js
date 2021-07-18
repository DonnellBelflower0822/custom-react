import { createStore } from 'redux'
import { actionType } from './actions-type'

function reducer(state, action) {
  switch (action.type) {
    case actionType.ADD:
      return { ...state, age: state.age + action.payload }
    case actionType.DESC:
      return { ...state, age: state.age - action.payload }
    default:
      return state
  }
}

const store = createStore(reducer, { name: 'allen', age: 27 })

export default store
