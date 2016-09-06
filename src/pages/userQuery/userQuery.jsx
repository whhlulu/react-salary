import React,{ Component } from 'react'
import {Link, Lifecycle,hashHistory} from 'react-router'
import { selectPassword, fetchConfirmIfNeeded } from '../../actions/confirmPw'
import { connect } from 'react-redux'
import Header from '../../components/header/header'


class UserQuery extends Component {
    constructor() {
        super()
        this.state={
            asd:"123"
        }
    }
    componentDidMount() {
        const { dispatch, selectedPassword } = this.props
        dispatch(fetchConfirmIfNeeded(selectedPassword))
    }

    handleClick() {
        const nextPassword ={
            "salarypsw": this.refs.searchInput.value
        }
        this.props.dispatch(fetchConfirmIfNeeded(nextPassword))
    }

    exitClick() {
        window.location.href = 'http://yyjz-portal-h5-native/closewindow'
    }

    render() {
        const style = require('../../css/reset.css')
        const { selectedPassword, data, isFetching } = this.props
        return (
            <div>
                <Header exitClick={this.exitClick.bind(this)} />
            <div className="userQuery">
                <div className="userName">{this.props.userName}</div>
                <div className="systemName">欢迎使用薪资查询</div>
                <input className="searchInput" type="password" placeholder='亲输入查询密码' ref="searchInput"/>
                <button className="searchBtn" onClick={this.handleClick.bind(this)}>确定</button>
                {/*<Link to="/pay"><button className="searchBtn">确定</button></Link>*/}
            </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    const { selectedPassword, getsByPassword } = state
    const {
        isFetching,
        items: data
    } = getsByPassword[selectedPassword] || {
        isFetching: true,
        items: []
    }

    return {
        selectedPassword,
        data,
        isFetching
    }
}

export default connect(mapStateToProps)(UserQuery)
