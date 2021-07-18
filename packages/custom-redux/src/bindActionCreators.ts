function bindActionCreator(actionCreator, dispatch) {
  return function (...args: unknown[]) {
    const action = actionCreator.apply(this, args);
    dispatch(action);
  };
}

export default function bindActionCreators(actionCreators, dispatch) {
  const bindActions = {};

  for (const key in actionCreators) {
    bindActions[key] = bindActionCreator(actionCreators[key], dispatch);
  }

  return bindActions;
}