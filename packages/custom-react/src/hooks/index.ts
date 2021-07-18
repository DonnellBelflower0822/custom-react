import { scheduleUpdate } from '../reactDOM/render';

// hook状态
const hookState = [];
let hookIndex = 0;

function fullUpdate() {
  hookIndex = 0;
  scheduleUpdate?.();
}

// 使用宏任务。浏览器ui渲染后才执行
type DestyoryFn = () => void;
export function useEffect(cb: () => DestyoryFn | void, deps?: unknown[]) {
  const currentHook = hookIndex;
  if (!hookState[currentHook]) {
    // 初始化
    // 在宏任务中执行
    setTimeout(() => {
      // 先执行一次
      const destoryFunction = cb();
      hookState[currentHook] = [destoryFunction, deps];
    });
    hookIndex += 1;
    return;
  }

  const [destoryFunction, lastDeps] = hookState[currentHook];
  const same = deps?.every((item, index) => item === lastDeps?.[index]);
  //  如果依赖项一样，则不需要执行effect
  if (same) {
    hookIndex++;
    return;
  }

  // 调用销毁函数
  destoryFunction?.();
  // 重新执行
  setTimeout(() => {
    const destoryFunction = cb();
    hookState[currentHook] = [destoryFunction, deps];
  });
  hookIndex += 1;
}

// 微任务。在浏览器ui渲染之前执行: queueMicrotask
export function useLayoutEffect(cb: () => DestyoryFn | void, deps: unknown[]) {
  const currentHookIndex = hookIndex;
  // 初始化
  if (!hookState[currentHookIndex]) {
    queueMicrotask(() => {
      const destoryFunction = cb();
      hookState[currentHookIndex] = [destoryFunction, deps];
    });
    hookIndex += 1;
    return;
  }

  const [destoryFunction, lastDeps] = hookState[currentHookIndex];
  const same = deps?.every((item, index) => item === lastDeps?.[index]);
  if (same) {
    hookIndex++;
    return;
  }

  // 重新执行。先调用销毁函数。在微任务重新执行
  destoryFunction?.();
  queueMicrotask(() => {
    const destoryFunction = cb();
    hookState[currentHookIndex] = [destoryFunction, deps];
  });
  hookIndex += 1;
}

export function useRef(initialState?: unknown) {
  hookState[hookIndex] = hookState[hookIndex] || { current: initialState };
  return hookState[hookIndex++];
}

// useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值
export function useImperativeHandle(ref, factoy) {
  ref.current = factoy();
}

type SetStateFn<T> = (state: T) => T;
type SetState<T> = (state: T | SetStateFn<T>) => void;
type GetState<T> = () => T;

// export function useState<T>(initalState: T | GetState<T>): [T, SetState<T>] {
//   hookState[hookIndex] = hookState[hookIndex] || (typeof initalState === 'function' ? (initalState as GetState<T>)() : initalState);

//   const currentIndex = hookIndex;
//   function setState<T>(newState: T | ((currentState: T) => T)) {
//     if (typeof newState === 'function') {
//       newState = (newState as SetStateFn<T>)(hookState[currentIndex]);
//     }
//     hookState[currentIndex] = newState;
//     fullUpdate();
//   }

//   return [
//     hookState[hookIndex++],
//     setState
//   ];
// }
export function useState(initalState) {
  return useReducer(null, initalState);
}

type ReducerAction = {
  type: string,
  [x: string]: unknown;
};

type ReaducerActionSetState<T> = (state: T) => T;
type Reducer<T> = (state: T, action: ReducerAction | ReaducerActionSetState<T>) => T | null;

export function useReducer<T>(reducer: Reducer<T>, initalState: T) {
  hookState[hookIndex] = hookState[hookIndex] || (typeof initalState === 'function' ? initalState() : initalState);

  const currentIndex = hookIndex;
  function dispatch(action: ReducerAction) {
    let nextState;
    const lastState = hookState[currentIndex];

    if (reducer) {
      // 处理传递reducer的情况
      nextState = reducer(
        lastState,
        action
      );
    } else {
      // 处理reducer为null的情况
      nextState = typeof action === 'function' ? (action as ReaducerActionSetState<T>)(lastState) : action;
    }

    if (nextState !== lastState) {
      hookState[currentIndex] = nextState;

      // 更新组件
      fullUpdate();
    }
  }

  return [
    hookState[hookIndex++],
    dispatch
  ];
}

export function useMemo<T>(factory: () => T, deps?: unknown[]): T {
  // 初始化
  if (!hookState[hookIndex]) {
    const newMemo = factory();
    hookState[hookIndex++] = [newMemo, deps];
    return newMemo;
  }

  const [lastMemo, lastDeps] = hookState[hookIndex];
  const same = deps?.every((item, index) => item === lastDeps?.[index]);
  if (same) {
    // 如果依赖项一样，直接返回缓存的值
    hookIndex += 1;
    return lastMemo;
  }

  // 不同则重新计算
  const memoValue = factory();
  hookState[hookIndex++] = [memoValue, deps];
  return memoValue;
}

export function useCallback(callback: () => void, deps?: unknown[]) {
  // 初始化
  if (!hookState[hookIndex]) {
    hookState[hookIndex++] = [callback, deps];
    return callback;
  }

  // 判断依赖项是否一样
  const [lastCallback, lastDeps] = hookState[hookIndex];
  const same = deps?.every((item, index) => item === lastDeps?.[index]);
  if (same) {
    // 一样则返回缓存的callback
    hookIndex += 1;
    return lastCallback;
  }

  // 重新缓存新的callback
  hookState[hookIndex++] = [callback, deps];
  return callback;
}

export function useContext(Context: { Provider: { _value: unknown; }; }) {
  return Context.Provider._value;
}
