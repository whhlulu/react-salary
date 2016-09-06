import React,{Component} from 'react'
import { Link } from 'react-router';

export default class MonthPay extends Component {
    constructor() {
        super()
    }

    render() {
        const style = require('../../css/reset.css')
        const getSummaryInfos = this.props.gets[0].summaryInfos
        const getXqInfos = this.props.gets[0].xqInfos
        const id = this.props.id
        return (
            <div className="monthPay">
                <p className="monthName">{getXqInfos.title}</p>
                <p className="yearName">{this.props.value.year}年</p>
                <Link to={{pathname:`/pay/${id}`,state:getXqInfos}}><span className="details">详情</span></Link>
                <hr/>
                {getSummaryInfos.map((getSummaryInfo, i) =>
                    <p className="payList" key={i}><span className="payListName">{getSummaryInfo.name}：</span><span className="payListNumber">{getSummaryInfo.value}元</span></p>
                )}
                <p className="payList"><span className="payListName payListNameSum">{getXqInfos.name}：</span><span className="payListNumber payListNumberSum">{getXqInfos.value}元</span></p>
            </div>
        )
    }
}

