/*
 * @Author: your name
 * @Date: 2019-12-23 14:03:35
 * @LastEditTime : 2019-12-23 14:17:06
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\components\changeWord\index.js
 */
import React, { Component } from 'react';
import './style/index.less';
import classnames from 'classnames';
class index extends Component {
    constructor(props){
        super(props)
        this.state={
            nowselect:"default"
        }
        this.wordcomp=React.createRef()
    }

    select=(key)=>{
        this.setState({nowselect:key},()=>{
            localStorage.setItem("word_size",key)
            this.props.onClick(key)
        })
        
    }
    componentDidMount(){
        const selected=localStorage.getItem("word_size");
        if(selected){
            this.setState({nowselect:selected})
        }
        
    }
    render() {
        const {nowselect}=this.state;
        const {onClick}=this.props;
        return (
            <div  className="word">
            <div className="word_box">
            <span onClick={()=>this.select("small")} className={classnames("word_item",nowselect==="small"?"light":"unlight")}>小</span> 
            <span className="line"></span> 
            <span onClick={()=>this.select("default")} className={classnames("word_item",nowselect==="default"?"light":"unlight")}>标准</span> 
            <span className="line"></span> 
            <span onClick={()=>this.select("big")} className={classnames("word_item",nowselect==="big"?"light":"unlight")}>大</span> 
            </div>
            </div>
        );
    }
}

export default index;