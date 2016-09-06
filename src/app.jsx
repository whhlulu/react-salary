import React, { Component } from 'react'

import Header from './components/header/header'


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '薪资查询'
        }

    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
export default App

