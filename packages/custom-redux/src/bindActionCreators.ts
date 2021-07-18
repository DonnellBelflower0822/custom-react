/**
 * @param actionCreators 动作创建器
 * @param dispatch store.dispatch
 * @returns 
 */
export default function bindActionCreators(actionCreators, dispatch) {
  const bindActions = {};

  for (const key in actionCreators) {
    bindActions[key] = (...args: unknown[]) => {
      const action = actionCreators[key].apply(this, args);
      dispatch(action)
    };
  }

  return bindActions;
}