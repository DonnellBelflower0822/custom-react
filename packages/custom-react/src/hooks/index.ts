import { scheduleUpdate } from '../reactDOM/render';

// hook状态
const hookState = [];
let hookIndex = 0;

function fullUpdate() {
  hookIndex = 0;
  scheduleUpdate();
}

// 使用宏任务。浏览器ui渲染后才执行
export function useEffect(cb, deps) {
  if (hookState[hookIndex]) {
    const [destoryFunction, lastDeps] = hookState[hookIndex];
    const same = deps?.every((item, index) => item === lastDeps[index]);

    if (same) {
      hookIndex++;
    } else {
      destoryFunction?.();
      setTimeout(() => {
        const destoryFunction = cb();
        hookState[hookIndex++] = [destoryFunction, deps];
      });
    }
  } else {
    setTimeout(() => {
      const destoryFunction = cb();
      hookState[hookIndex++] = [destoryFunction, deps];
    });
  }
}

// 微任务。在浏览器ui渲染之前执行: queueMicrotask
export function useLayoutEffect(cb, deps) {
  if (hookState[hookIndex]) {
    const [destoryFunction, lastDeps] = hookState[hookIndex];
    const same = deps?.every((item, index) => item === lastDeps[index]);

    if (same) {
      hookIndex++;
    } else {
      destoryFunction?.();
      queueMicrotask(() => {
        const destoryFunction = cb();
        hookState[hookIndex++] = [destoryFunction, deps];
      });
    }
  } else {
    queueMicrotask(() => {
      const destoryFunction = cb();
      hookState[hookIndex++] = [destoryFunction, deps];
    });
  }
}

export function useRef(initialState) {
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

export function useReducer(reducer, initalState) {
  hookState[hookIndex] = hookState[hookIndex] || (typeof initalState === 'function' ? initalState() : initalState);

  const currentIndex = hookIndex;
  function dispatch(action) {
    if (reducer) {
      hookState[currentIndex] = reducer(
        hookState[currentIndex],
        action
      );
    } else {
      const lastState = hookState[currentIndex];
      hookState[currentIndex] = typeof action === 'function' ? action(lastState) : action;
    }

    fullUpdate();
  }

  return [
    hookState[hookIndex++],
    dispatch
  ];
}

export function useMemo<T>(factory: () => T, deps: unknown[]): T {
  if (!hookState[hookIndex]) {
    const newMemo = factory();
    hookState[hookIndex++] = [newMemo, deps];
    return newMemo;
  }

  const [lastMemo, lastDeps] = hookState[hookIndex];
  const same = deps.every((item, index) => item === lastDeps[index]);
  if (same) {
    hookIndex += 1;
    return lastMemo;
  }

  const memoValue = factory();
  hookState[hookIndex++] = [memoValue, deps];
  return memoValue;
}

export function useCallback(callback, deps) {
  if (!hookState[hookIndex]) {
    hookState[hookIndex++] = [callback, deps];
    return callback;
  }

  const [lastCallback, lastDeps] = hookState[hookIndex];
  const same = deps.every((item, index) => item === lastDeps[index]);
  if (same) {
    hookIndex += 1;
    return lastCallback;
  }

  hookState[hookIndex++] = [callback, deps];
  return callback;
}

export function useContext(Context) {
  return Context.Provider._value;
}
