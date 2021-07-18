import rootReducer from './reducers/index.js'

const { createStore } = CustomRedux

// 全局state在每个reducer中维护。
// 创建store会初始化派发一次。将全局state收集起来
const store = createStore(rootReducer)

export default store
