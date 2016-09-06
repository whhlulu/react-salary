import React, {Component} from 'react'
import {Link} from 'react-router';
import Header from '../../components/header/header'


class PayDetails extends Component {
    constructor() {
        super()
    }

    exitClick() {
        window.history.back();
    }
    render() {
        const style = require('../../css/reset.css')
        const getXqInfos= this.props.location.state
        return (
            <div>
                <Header exitClick={this.exitClick.bind(this)} />
            <div className="payDetails">
                <p className="detailsMonthName">{getXqInfos.title}</p>
                <hr />
                {getXqInfos.infos.map((infos, i) =>
                    <PayDetail key={i} infos={infos} />
                )}
                <button className="payDetailAll">{getXqInfos.name}：{getXqInfos.value}元</button>

            </div>
            </div>

        )
    }
}

class PayDetail extends Component {
    constructor() {
        super()
    }
    render() {
        const infos = this.props.infos
        const info = infos.info
        return (
            <div className="payDetail">
                <div className="payDetailName"><span className="mark"></span>{infos.title}</div>
                {info.map((info, i) =>
                    <p  className="payDetailContent" key ={i}>{info.name}：<span>{info.value}元</span></p>
                )}
            </div>
        )
    }
}

export default PayDetails
