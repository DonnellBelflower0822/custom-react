type Action = {
  type: string;
  [x: string]: unknown;
};

type Reducer<T> = (state: T, action: Action) => T;
type Listener = () => void;

/**
 * 创建仓库
 * @param reducer 处理器
 * @param preloadedState 初始状态
 * @returns 
 */
export default function createStore<T>(reducer: Reducer<T>, preloadedState: T) {
  // 状态
  let state: T = preloadedState;
  const listeners: Listener[] = [];

  // 获取状态
  function getState() {
    return state;
  }

  // 订阅
  function subscribe(listener: Listener) {
    listeners.push(listener);

    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  // 派发
  function dispatch(action: Action) {
    // 根据action和reducer进行处理
    state = reducer(state, action);
    // 发布订阅
    listeners.forEach(listener => listener());
    return state;
  }

  dispatch({ type: "@@REDUX/INIT" });

  // 仓库
  const store = {
    getState,
    subscribe,
    dispatch
  };

  return store;
}