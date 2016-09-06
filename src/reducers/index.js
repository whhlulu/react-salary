import { combineReducers } from 'redux' // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux' // 将routerReducer一起合并管理
import {selectedMonths,getsByDate} from './pay' // 引入pay这个reducer
import {selectedPassword, getsByPassword} from './confirmPw' // 引入pay这个reducer

export default combineReducers({
    selectedPassword,
    getsByPassword,
    selectedMonths,
    getsByDate,
    routing: routerReducer
})