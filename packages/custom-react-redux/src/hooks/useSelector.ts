import customReact from 'custom-react';
import ReduxContext from '../ReduxContext';

export function useSelector(mapStateToProps) {
  // 获取ReduxContext上下文数据
  // @ts-ignore
  const { store } = customReact.useContext(ReduxContext);
  const state = store.getState();

  // 拿到mapStateToProps后的数据
  const stateProps = mapStateToProps(state);

  const [, forceUpdate] = customReact.useReducer(x => x + 1, 0);
  customReact.useEffect(() => {
    // 订阅store更改 -> 组件刷新
    return store.subscribe(forceUpdate);
  }, [store.subscribe]);

  return stateProps;
}
