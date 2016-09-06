import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from '../reducers'
// 利用compose增强store，这个 store 与 applyMiddleware 和 redux-devtools 一起使用
import { createStore, applyMiddleware, compose } from 'redux'

const loggerMiddleware = createLogger()

// 创建一个中间件集合
const middleware = [thunk, loggerMiddleware]

const finalCreateStore = compose(
    applyMiddleware(...middleware)
)(createStore)

export default finalCreateStore