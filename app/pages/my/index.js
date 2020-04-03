/*
 * @Author: your name
 * @Date: 2019-08-28 16:32:58
 * @LastEditTime: 2019-12-17 09:33:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\my\index.js
 */
import React, { Component } from 'react';
import FooterBar from '../../components/footerBar/footerbar';
import './style/index.less';
import Avatar from 'antd/es/avatar';
import 'antd/es/avatar/style';
import { Badge, Button, WhiteSpace } from 'antd-mobile';
import List from '../../components/List';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import commonUrl from '../../config';
import axios from 'axios';
import noAuth from '../../util/noAuth';
class Mycomp extends Component {
    forgetpwd = () => {
        this.props.history.push('/resetpwd');
    }
    loginout = () => {
        localStorage.setItem("loginState", "loginout");
        localStorage.clear();
        if (window.deviceId) {
            axios.post(`${commonUrl}/app/unBindDeviceInfo.do`, { deviceId: window.deviceId, userId: this.props.userinfo.id })
                .then(res => {
                    noAuth.noAuthCode(res.data)
                    if (res.data.code === 'success') {
                        console.log('******解绑设备成功******')
                    }
                })
        }
        this.props.history.push('/login');
    }
    render() {
        const { userinfo } = this.props;
        return (
            <div className="my">
                <div className="my_info">
                    <Avatar style={{ marginLeft: ".2rem" }} size={64} icon="user" />
                    <div className="my_info-content">
                        <div><span>{userinfo.realName}</span>
                            {/* <Badge text="离休" hot style={{ background:"#F19736",marginLeft: 12 }} /> */}
                        </div>
                        <div><span>{userinfo.unitName}</span>&nbsp;&nbsp;
                        {/* <span>主任</span> */}
                        </div>
                    </div>
                </div>
                {/* <List>
                        <List.Item type="user" onClick={()=>this.props.history.push('/mybranch')}>我的支部</List.Item>
                    </List> */}
                {/* <WhiteSpace size="xl"/> */}
                <List>
                    <List.Item onClick={() => this.props.history.push('/homeServer')} >我的家政</List.Item>
                    <List.Item onClick={() => this.props.history.push('/myorder')} >我的订单</List.Item>
                    <List.Item onClick={this.forgetpwd} >修改密码</List.Item>
                    <List.Item onClick={() => this.props.history.push('/suggest')} >意见反馈</List.Item>
                </List>
                <WhiteSpace size="xl" />
                <List>
                    <List.Item onClick={() => this.props.history.push('/about')} >关于</List.Item>
                    <List.Item onClick={() => this.props.history.push('/help')} >帮助</List.Item>
                </List>
                <WhiteSpace size="xl" />
                <Button onClick={this.loginout}>退出登录</Button>
                <FooterBar />
            </div>
        );
    }
}
const mapStateToProps = (state, ownprops) => {
    return {
        userinfo: state.userinfo
    }
}

const reduxMy = withRouter(Mycomp)
export default connect(mapStateToProps, null)(reduxMy);