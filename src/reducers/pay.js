import { INCREASE,SELECT_MONTHS,INVALIDATE_MONTHS,
    REQUEST_GET_MONTHS,RECEIVE_GET_MONTHS,STOP_REQUEST} from '../constants/constants'
import { MonthToString } from './../utils/Url'
// 初始化state数据
const myDate = new Date()
const year = myDate.getFullYear()
const monthNow = myDate.getMonth()
const startmonth=MonthToString(monthNow).a
const month=MonthToString(monthNow).b



const initialState = {
    "year" : String(year),
    "startmonth" : startmonth,
    "month" : month
}

export function selectedMonths(state =initialState, action) {
    switch (action.type) {
        case SELECT_MONTHS:
            return action.date
        default:
            return state
    }
}
function gets(state = {
    isFetching: false,
   /* didInvalidate: false,*/
    items: []
}, action) {
    switch (action.type) {
        case INVALIDATE_MONTHS :
            return Object.assign({}, state, {
                /*didInvalidate: true*/
            })
        case REQUEST_GET_MONTHS:
            return Object.assign({}, state, {
                isFetching: true,
                /*didInvalidate: false*/
            })
        case STOP_REQUEST:
            return Object.assign({}, state, {
                isFetching: false,
                /*didInvalidate: true,*/
            })
        case RECEIVE_GET_MONTHS:
            return Object.assign({}, state, {
                isFetching: false,
                /*didInvalidate: true,*/
                items: action.gets,
            })
        default:
            return state
    }
}

export function getsByDate(state = { }, action) {
    switch (action.type) {
        case INVALIDATE_MONTHS :
        case RECEIVE_GET_MONTHS:
        case STOP_REQUEST:
        case REQUEST_GET_MONTHS:
            return Object.assign({}, state, {
                [action.date]: gets(state[action.date], action)
            })
        default:
            return state
    }
}