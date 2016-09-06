import React,{Component} from 'react'


class Header extends Component{
    constructor() {
        super()
        this.state ={
            title : "薪资查询"
        }
    }

/*    handleClick(e) {
        window.history.back();
    }*/

    render() {


        let backimg = require('../../img/backyellow.png')
        const style = require('./header.css')
        return (
            <div className='header'>
	            <span id='back' onClick={this.props.exitClick}>
	                <img src={backimg}/>
	            </span>
                <span id='title'>{this.state.title}</span>
            </div>
        )
    }
}
export default Header
