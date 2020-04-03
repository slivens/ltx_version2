/*
 * @Author: slivens
 * @Date: 2019-11-22 10:41:38
 * @LastEditTime: 2019-12-12 16:54:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\message\mesgsDetail.js
 */
import React, { Component } from 'react';
import "./style/index.less";
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import commonUrl from '../../config';
import { WhiteSpace } from 'antd-mobile';
import {connect} from 'react-redux';
import noAuth from '../../util/noAuth';
class mesgsDetail extends Component {
    state={
        mesgsList:[]
    }
    componentWillMount(){
        const {history,location}=this.props;
        const {params:{title,id,params}}=location;
        axios.post(`${commonUrl}/app/qryMsgRecordList.do`,{userId:9984,recordId:id,params})
        .then(res=>{
            noAuth.noAuthCode(res.data)
            if(res.data.code==='success'){
                this.setState({mesgsList:res.data.data})
            }
        })
    }
    readinfo=({id,params})=>{
        axios.post(`${commonUrl}/app/readMsgRecord.do`,{userId:9984,recordId:id,params})
        .then(res=>{
            noAuth.noAuthCode(res.data)
            if(res.data.code==='success'){
            }
        })
    }
    render() {
        const {history,location}=this.props;
        const {params:{title,id,params}}=location;
        return (
            <div className="mesgDetail">
                <div className="mesgDetail_topbar">
                    <span>{title}</span>
                    <Icon
                    onClick={() => this.props.history.goBack()}
                    style={{
                        position: "absolute",
                        left: ".1rem",
                        top: "50%",
                        color: "#F7F8F4",
                        fontSize: ".24rem",
                        transform: "translateY(-50%)"
                    }} type="left" />
                </div>
                {
                    this.state.mesgsList.map((item,index)=>(
                        <div key={index} className="mesgDetail_item" onClick={()=>this.readinfo(item)}>
                        <WhiteSpace size="lg"/>
                        <div className="date"><span>{item.createTime}</span></div>
                        <div className="mesgDetail_item_card">
                            <div className="title">
                            {
                                item.readed&&<span className="dot"/>
                            }
                            <span className="word">{item.title}</span></div>
                            <div className="content">{item.content}</div>
                            <div className="detail">查看详情
                            <Icon
                                style={{
                                    position: "absolute",
                                    right: ".1rem",
                                    top: "50%",
                                    color: "#bbb",
                                    fontSize: ".24rem",
                                    transform: "translateY(-50%)"
                                }} type="right" />
                            </div>
                        </div>
                    </div>
                    ))
                }
                    
                </div>
        );
    }
}
const mapStateToProps=(state,onwporps)=>{
    return{
        userId:state.userinfo.id
    }
}
export default connect(mapStateToProps)(withRouter(mesgsDetail));