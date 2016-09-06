import { REQUEST_CONFIRM, RECEIVE_CONFIRM, SELECT_PASSWORD } from '../constants/constants'
// 初始化state数据
const initialState = {
    "userid":"0001OO100000000000YF",
    "salarypsw":""
}

export function selectedPassword(state = initialState, action) {
    switch (action.type) {
        case SELECT_PASSWORD:
            return action.password
        default:
            return state
    }
}

function gets(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_CONFIRM:
            return Object.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_CONFIRM:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.data
            })
        default:
            return state
    }
}
export function getsByPassword(state = { }, action) {
    switch (action.type) {
        case RECEIVE_CONFIRM:
        case REQUEST_CONFIRM:
            return Object.assign({}, state, {
                [action.password]: gets(state[action.password], action)
            })
        default:
            return state
    }
}
