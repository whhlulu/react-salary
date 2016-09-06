import React,{ Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import MonthPay from './monthPay'
import MonthSearchInput from './monthSearchInput'

import {selectMonths,fetchGetsIfNeeded,invalidateMonths} from '../../actions/pay'
import Header from '../../components/header/header'

class Pay extends Component {
    constructor() {
        super()
    }
    exitClick() {
        window.location.href = 'http://yyjz-portal-h5-native/closewindow'
    }
    componentDidMount() {
        const { dispatch, selectedMonths } = this.props
        dispatch(fetchGetsIfNeeded(selectedMonths))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedMonths !== this.props.selectedMonths) {
            const { dispatch, selectedMonths } = nextProps
            dispatch(fetchGetsIfNeeded(selectedMonths))
        }
    }

    handleClick(nextDate) {
        this.props.dispatch(selectMonths(nextDate))
    }
    render() {
        const loadimg = require("../../img/loading.gif")
        const style = require('../../css/reset.css')
        const { selectedMonths, gets, isFetching } = this.props
        return (
            <div>
                <Header exitClick={this.exitClick.bind(this)} />
                <div className="pay">
                    <div className="monthSearch">
                        <MonthSearchInput  value={ selectedMonths }
                                           onClick={this.handleClick.bind(this)}/>
                    </div>
                    {isFetching &&
                    <div className="loadMask" >
                        <span className="loadImg"><img src={loadimg}/></span>
                    </div>
                    }
                    {!isFetching && gets.length === 0 &&
                    <div className="noData">查询期间无薪资发放数据！</div>
                    }
                    {gets.map((gets, i) =>
                        <MonthPay key={i} id={i} gets={gets} value={ selectedMonths } />
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { selectedMonths, getsByDate } = state
    const {
        isFetching,
        items: gets
    } = getsByDate[selectedMonths] || {
        isFetching: true,
        items: []
    }

    return {
        selectedMonths,
        gets,
        isFetching
    }
}

export default connect(mapStateToProps)(Pay)