import { ADD2, DESC2 } from '../action-types';

const initalState = {
  name: 'tom',
  age: 18
}
export default function counter1(state = initalState, action) {
  switch (action.type) {
    case ADD2:
      return { ...state, age: state.age + action.payload }
    case DESC2:
      return { ...state, age: state.age - action.payload }
    default:
      return state
  }
}