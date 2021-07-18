import customReact from 'custom-react';
import ReduxContext from '../ReduxContext';

export function useSelector(mapStateToProps) {
  // @ts-ignore
  const { store } = customReact.useContext(ReduxContext);
  const state = store.getState();

  const stateProps = mapStateToProps(state);
  const [, forceUpdate] = customReact.useReducer(x => x + 1, 0);
  customReact.useEffect(() => {
    return store.subscribe(forceUpdate);
  }, [store.subscribe]);

  return stateProps;
}
