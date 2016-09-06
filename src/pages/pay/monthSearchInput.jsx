import React from 'react';
import BirthPicker from '../../components/BirthPicker/BirthPicker';
import { connect } from 'react-redux'

class MonthSearchInput extends React.Component {
    constructor() {
        super()
    }

    dataClick() {
        this.refs.birthPicker.refs.selectMonth.style.display = "block"
    }

    render() {
        const style = require('../../css/reset.css')
        const { value, onClick, options } = this.props
        var placeholder = value.year + '年' + value.startmonth + '月-' + value.month + '月';
        return (
            <div>
                <div className="monthSearchInput"
                       onClick={this.dataClick.bind(this)} >{placeholder}</div>

                <BirthPicker ref="birthPicker" onClick={nextDate=> onClick(nextDate)} value={value}/>
            </div>

        )
    }
}
export default MonthSearchInput

