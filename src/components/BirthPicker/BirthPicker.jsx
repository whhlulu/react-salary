import React, {Component} from 'react'
import Picker from 'react-mobile-picker'

function generateNumberArray(begin, end) {
    let array = [];
    for (let i = begin; i <= end; i++) {
        array.push((i < 10 ? '0' : '') + i);
    }
    return array;
}

class BirthPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPickerShow: false,
            valueGroups: {
                year: String(this.props.value.year),
                month: String(this.props.value.startmonth),
                day: String(this.props.value.month)
            },
            optionGroups: {
                year: generateNumberArray(this.props.value.year-3, this.props.value.year),
                month: generateNumberArray(1, 12),
                day: generateNumberArray(Number(this.props.value.startmonth), 12)
            }
        };
    }

    handleChange = (name, value) => {
        this.setState(({valueGroups, optionGroups}) => {
            const nextState = {
                valueGroups: {
                    ...valueGroups,
                    [name]: value
                }
            };
            if (name === 'month') {
                    nextState.optionGroups = {
                        ...optionGroups,
                        day: generateNumberArray(Number(value), 12)
                    };
                }
                //按照终止月判断起始月（暂不需要）
           /* if (name === 'day') {
                nextState.optionGroups = {
                    ...optionGroups,
                    month: generateNumberArray(1, Number(value))
                };
            }*/
            return nextState;
        });
    };

    togglePicker = () => {
        this.setState(({isPickerShow}) => ({
            isPickerShow: !isPickerShow
        }));
    };

    handleClick(e){
        this.refs.selectMonth.style.display = "none"
    }
    unHandleClick(e) {
        e.stopPropagation()
    }
    unTouchHandle(e){
        e.preventDefault()
    }

    render() {
        const style = require('./birthPicker.css')
        const {isPickerShow, optionGroups, valueGroups} = this.state;
        const maskStyle = {
            display: isPickerShow ? 'block' : 'none'
        };
        const pickerModalClass = `picker-modal${isPickerShow ? ' picker-modal-toggle' : ''}`;
        const {onClick} = this.props
        return (
            <div className="picker-main" ref="selectMonth" onTouchMove={this.unTouchHandle.bind(this)}>

                <div className="top-box" onClick={this.handleClick.bind(this)}></div>

                <div className="picker-modal-con" onTouchMove={this.unTouchHandle.bind(this)}>
                    <div className={pickerModalClass}>
                        <Picker
                            optionGroups={optionGroups}
                            valueGroups={valueGroups}
                            onChange={this.handleChange} />
                    </div>
                    <a href="javascript:;" className="birth-ok" onClick={nextDate=> {
                        onClick({
                            "year": valueGroups.year,
                            "startmonth": valueGroups.month,
                            "month": valueGroups.day
                        })
                        this.refs.selectMonth.style.display = "none"
                    }}>确 定</a>
                </div>
            </div>
        );
    }
}

export default BirthPicker
