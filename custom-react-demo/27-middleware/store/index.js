import rootReducer from './reducers/index.js'

const { createStore } = CustomRedux

function logger() {
  return function (next) {
    return function (action) {
      console.log('prev')
      next(action)
      console.log('next')
    }
  }
}

function thunk(store) {
  return function (next) {
    return function (action) {
      if (typeof action === 'function') {
        return action(store.dispatch, store.getState)
      }

      next(action)
    }
  }
}

function promise(store) {
  return function (next) {
    return function (action) {
      if (typeof action.then === 'function') {
        return action.then(newAction => store.dispatch(newAction))
      }

      next(action)
    }
  }
}
function applyMiddleware(middleware) {
  return function (createStore) {
    return function (reducers) {
      const store = createStore(reducers)
      const oldDispatch = store.dispatch
      store.dispatch = middleware(store)(oldDispatch)
      return store
    }
  }
}
// const store = applyMiddleware(logger)(createStore)(rootReducer)

// 支持派发一个函数
// const store = applyMiddleware(thunk)(createStore)(rootReducer)

// 支持派发一个函数
// const store = applyMiddleware(promise)(createStore)(rootReducer)

function combine(...args) {
  return args.reduce((prev, item) => ((...a) => prev(item(...a))))
}

function applyMiddlewares(...middlewares) {
  return function (createStore) {
    return function (reducers) {
      const store = createStore(reducers)
      const oldDispatch = store.dispatch
      const chain = middlewares.map(middleware => middleware(store))
      store.dispatch = combine(...chain)(oldDispatch)
      return store
    }
  }
}

const store = applyMiddlewares(promise, thunk, logger)(createStore)(rootReducer)

// 全局state在每个reducer中维护。
// 创建store会初始化派发一次。将全局state收集起来
// const store = createStore(rootReducer)

// const { dispatch } = store
// store.dispatch = (action) => {
//   console.log('prev')
//   dispatch(action)
//   console.log('next')
// }


export default store
