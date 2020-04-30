import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Flex, Badge} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import './style/index.less';
// import Icon from 'antd/es/icon';
// import 'antd/es/icon/style';

import noAuth from '../../util/noAuth';
import Icon from '../icon';

//const test = "http://127.0.0.1:8088";
const test = "http://192.168.137.1:8088";

class footerbar extends Component {
    state = {
        unReadedMsgNum: 0
    };

    componentWillMount() {
        this.getUnreadedMsgNum();
    }

    componentDidMount() {
        // 监听plusready事件
       /* document.addEventListener("plusready", function () {
            // 添加监听从系统消息中心点击某条消息启动应用事件
            //监听系统通知栏消息点击事件
            plus.push.addEventListener("click", function (msg) {
                console.log('====================click====================', msg);
            }, false);

            // 获取个推服务端编程透传的消息，
            plus.push.addEventListener("receive", function (msg) {
                console.log('====================receive====================', msg);
                this.getUnreadedMsgNum();
            }, false);
        }, false);*/
        if (window.plus){
            plus.push.addEventListener("click", function (msg) {
                console.log('====================click====================', msg);
            }, false);

            plus.push.addEventListener("receive", function (msg) {
                console.log('====================receive====================', msg);
                this.getUnreadedMsgNum();
            }, false);
        }

    }

    getUnreadedMsgNum = () => {
        console.log('=====getUnreadedMsgNum=====')
        const {userinfo} = this.props;
        axios.post(`${test}/app/msg/qryUnreadedMsgNum.do`, {userId: userinfo.id})
            .then(res => {
                noAuth(res.data, () => history.push('/login'));
                if (res.data.code === 'success') {
                    this.setState({unReadedMsgNum: res.data.data})
                }
            })
    };

    gowhere = (key) => {
        let msg = {
            "__UUID__": "androidPushMsg126874268",
            "title": "福建老干部",
            "appid": "com.rjsoft.lgbEnt",
            "content": "{'msgType':'2', 'msgTitle':'测试11', 'objId':'8181808471bf9c5e0171bf9d29800002', 'msgId':'8181808471bf9c5e0171bfa35619000f'}",
            "payload": "{msgType=2, msgTitle=测试11, objId=8181808471bf9c5e0171bf9d29800002, msgId=8181808471bf9c5e0171bfa35619000f}"
        };
        /*const {history, location} = this.props;
        if (key === '/message') {
            let payload = msg.content;
            payload = (new Function("return " + payload))();
            let msgType = payload.msgType;
            // params: {id: msgType, params} || {}   params: location.params || {}
            if (msgType == 4) {
                history.push({pathname: `/zbdetail/${payload.objId}`})
            } else {
                history.push({pathname: `/messageNotice/${payload.objId}/${msgType}`})
            }
        }*/
        if (window.plus) {
           /* plus.push.createMessage(
                "测试",
                JSON.stringify({
                    msgType: 2,
                    msgTitle: '测试11',
                    objId: '8181808471bf9c5e0171bf9d29800002',
                    msgId: '8181808471bf9c5e0171bfa35619000f'
                }),
                "LocalMSG");*/
        }
        this.props.history.push(key)
    };

    render() {
        const {history, location} = this.props;
        const {unReadedMsgNum} = this.state;
        const path = location.pathname.split('/')[1];
        return (
            <div className="footerbar">
                <Flex>
                    <Flex.Item
                        onClick={() => localStorage.getItem('username') ? this.gowhere('/home') : this.gowhere('/login')}>
                        <div className={path === "home" ? "active" : ""}>
                            <Icon
                                className="footer_icon"
                                style={{color: "#b6b6b6", fontSize: ".28rem"}}
                                type="shouye" theme="filled"/>
                            <div className="footer_title">首页</div>
                        </div>
                    </Flex.Item>
                    <Flex.Item
                        onClick={() => localStorage.getItem('username') ? this.gowhere('/tel') : this.gowhere('/login')}>
                        <div className={path === "tel" ? "active" : ""}>
                            <Icon
                                className="footer_icon"
                                style={{color: "#b6b6b6", fontSize: ".28rem"}}
                                type="tongxunlu" theme="filled"/>
                            <div className="footer_title">通讯录</div>
                        </div>
                    </Flex.Item>
                    <Flex.Item
                        onClick={() => localStorage.getItem('username') ? this.gowhere('/message') : this.gowhere('/login')}>
                        <div className={path === "message" ? "active" : ""}>
                            <Badge overflowCount={99} text={unReadedMsgNum} style={{marginTop: '5px'}}>
                                <Icon
                                    className="footer_icon"
                                    style={{color: "#b6b6b6", fontSize: ".28rem"}}
                                    type="xinxi" theme="filled"/>
                            </Badge>
                            <div className="footer_title">消息</div>
                        </div>
                    </Flex.Item>
                    <Flex.Item
                        onClick={() => localStorage.getItem('username') ? this.gowhere('/my') : this.gowhere('/login')}>
                        <div className={path === "my" ? "active" : ""}>
                            <Icon
                                className="footer_icon"
                                style={{color: "#b6b6b6", fontSize: ".28rem"}}
                                type="wode"/>
                            <div className="footer_title">我的</div>
                        </div>
                    </Flex.Item>
                </Flex>
            </div>
        );
    }
}
const mapStateToProps = (state, ownprops) => {
    return {
        userinfo: state.userinfo,
    }
};
export default connect(mapStateToProps, null)(withRouter(footerbar));