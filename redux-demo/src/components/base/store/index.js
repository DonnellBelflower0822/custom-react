import { createStore } from 'redux'

export const actionType = {
  ADD: 'ADD',
  DESC: 'DESC',
}

function reducer(state, action) {
  switch (action.type) {
    case actionType.ADD:
      return { ...state, age: state.age + 1 }
    case actionType.DESC:
      return { ...state, age: state.age - 1 }
    default:
      return state
  }
}

const store = createStore(reducer, { name: 'allen', age: 27 })

export default store
