import { ADD1, DESC1 } from '../action-types';

const initalState = {
  name: 'allen',
  age: 27
}
export default function counter1(state = initalState, action) {
  switch (action.type) {
    case ADD1:
      return { ...state, age: state.age + action.payload }
    case DESC1:
      return { ...state, age: state.age - action.payload }
    default:
      return state
  }
}