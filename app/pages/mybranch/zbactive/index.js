/*
 * @Author: your name
 * @Date: 2019-09-19 10:36:55
 * @LastEditTime: 2020-02-25 17:50:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\mybranch\zbactive\index.js
 */
import React, { Component } from 'react';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import Zbtj from './zbtj';
import {withRouter} from 'react-router-dom';
import List from './list';
import axios from 'axios';
import commonUrl from '../../../config/index';
import {connect} from 'react-redux';
import { Toast } from 'antd-mobile';
const test="http://192.168.111.132:8080";
class zbactive extends Component {
    state={items:[]}
    tabonChange=(tab)=>{
        console.log('@@@@@@tab',tab)
        this.fetchdata(tab)
    }
    componentWillMount(){
        let tab=localStorage.getItem('branch_tab')
        if(tab){
            this.fetchdata(JSON.parse(tab));
        }else{
            this.fetchdata()
        }
    }
    fetchdata=(tab)=>{
        console.log('@@@@@@tab',tab)
        let obj={};
        if(tab&&tab.title==='我参与的'){
            obj.userId=this.props.userid;
        }
        if(tab&&tab.title==='我发布的'){
            obj.operUserId=this.props.userid;
        }
        console.log('@@@@@obj',obj)
        axios.post(`${commonUrl}/app/activity/findActivityList.do`,obj
         )
        .then(res => {
            if(res.data.code==="success"){
                this.setState({items:res.data.data})
            }else{
            }
        })
    }
    render() {
        return (
            <div className="zbactive">
                <div className="zbactive_topbar">
                    <Icon
                        onClick={() => this.props.history.goBack()}
                        style={{
                            position: "absolute",
                            left: ".1rem",
                            top: "50%",
                            color: "#F7F8F4",
                            fontSize: ".24rem",
                            transform: "translateY(-50%)"
                        }} 
                        type="left" 
                        />
                    支部活动
                    <Icon
                    type="menu"
                    style={{
                        position: "absolute",
                        right: ".1rem",
                        top: "50%",
                        color: "#F7F8F4",
                        fontSize: ".18rem",
                        transform: "translateY(-50%)"
                    }} 
                    onClick={()=>this.props.partyBranchId?this.props.history.push('/pushActivity'):Toast.info('未获得发布权限，请联系管理员！')}
                    />
                    </div>
                    <div className="zbactive-box">
                    <Zbtj tabonChange={this.tabonChange}/>
                    <div style={{height:".2rem"}}/>
                    <List items={this.state.items}/>
                    </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    userid: state.userinfo.id,
    partyBranchId:state.userinfo.partyBranchId
})
const mapdispatchToProps=(dispatch, ownProps)=>{
    return {
    }
}
export default connect(mapStateToProps,mapdispatchToProps)(withRouter(zbactive));