import React from 'react'
import { Route, IndexRoute,Redirect } from 'react-router'

import App from './../app'
import UserQuery from './../pages/userQuery/userQuery'
import Pay from './../pages/pay/pay'
import PayDetails from './../pages/payDetails/payDetails'
import { GetRequest } from './../utils/Url'


if(GetRequest().requirePass === "true"){
    var com = UserQuery
} else {
    com = Pay
}

export default (
    <Route path="/" component={App}>
        <IndexRoute component={com}/>
        <Route path="pay">
            <IndexRoute component={Pay} />
            <Route path=":id" component={PayDetails}/>
        </Route>
    </Route>
)