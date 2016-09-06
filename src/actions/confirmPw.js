import fetch from 'isomorphic-fetch'
import { GetRequest } from './../utils/Url'

import { REQUEST_CONFIRM, RECEIVE_CONFIRM, SELECT_PASSWORD } from '../constants/constants'

function selectPassword(password) {
  return {
    type: SELECT_PASSWORD,
    password
  };
}

function requestConfirm(password) {
  return {
    type: REQUEST_CONFIRM,
    password
  };
}

function receiveConfirm(password, json) {
  return {
    type: RECEIVE_CONFIRM,
    password,
    data: json.data
  };
}

function fetchConfirm(password){
    return  dispatch =>{
        dispatch(requestConfirm(password))
        const param ={
                    "userid" : GetRequest().userid,
                    "salarypsw" : password.salarypsw,
                }
        let url = '/maservlet/salary/validate?params=' + JSON.stringify(param);
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveConfirm(password, json)))
    }
}

function shouldFetchConfirm(state, password){
    const data =state.getsByPassword[password]
    if(!data) {
        return true
    } else if (data.isFetching){
        return false
    } else {
        return true
    }
}

export function fetchConfirmIfNeeded(password) {
    return (dispatch, getState) => {
        if (shouldFetchConfirm(getState(),password)){
            return dispatch(fetchConfirm(password))
        }
    }
}