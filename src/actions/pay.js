import fetch from 'isomorphic-fetch'
import { GetRequest } from './../utils/Url'

import { INCREASE,SELECT_MONTHS,INVALIDATE_MONTHS,
    REQUEST_GET_MONTHS,RECEIVE_GET_MONTHS,STOP_REQUEST} from '../constants/constants'


export function  increase (date) {
    return {
        type: INCREASE,
        date
    }
}

export function selectMonths(date) {
    return {
        type: SELECT_MONTHS,
        date
    }
}

export function invalidateMonths(date) {
    return {
        type: INVALIDATE_MONTHS,
        date
    }
}

function requestGetMonths(date) {
    return {
        type: REQUEST_GET_MONTHS,
        date
    }
}

function receiveGetMonths(date, json) {
    return {
        type: RECEIVE_GET_MONTHS,
        date,
        gets: json.data,
        receivedAt: Date.now()
    }
}
function stopRequest(date, e) {
    console.log(e.message)//可以在这里弹出错误信息
    return {
        type: STOP_REQUEST,
        date
    }
}

function fetchGetMonths(date){
    return  dispatch =>{
        dispatch(requestGetMonths(date))
        const param ={
            "userid" : GetRequest().userid,
            "salarypsw" : "",
            "year" : date.year,
            "startmonth" : date.startmonth,
            "month" : date.month
        }

        let url = '/maservlet/salary/searchForMonths?params=' + JSON.stringify(param);
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveGetMonths(date, json)))
            .catch(e => dispatch(stopRequest(date, e)))
    }
}

function shouldFetchGetMonths(state, date){
    const gets =state.getsByDate[date]
    if(!gets) {
        return true
    } else if (gets.isFetching){
        return false
    } else {
        return true
    }
}

export function fetchGetsIfNeeded(date) {
    return (dispatch, getState) => {
        if (shouldFetchGetMonths(getState(),date)){
            return dispatch(fetchGetMonths(date))
        }
    }
}