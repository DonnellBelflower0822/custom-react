export default function combineReduers(reducers) {
  return function (state = {}, actions) {
    const nextState = {};

    for (const key in reducers) {
      nextState[key] = reducers[key](state[key], actions);
    }

    return nextState;
  };
}