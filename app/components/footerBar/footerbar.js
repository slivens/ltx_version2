import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Flex, Badge} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import './style/index.less';
// import Icon from 'antd/es/icon';
// import 'antd/es/icon/style';

import noAuth from '../../util/noAuth';
import commonUrl from '../../config';
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
        const {history} = this.props;
        const _that = this;
        try {
            if (window.plus) {
                plus.push.addEventListener("click", function (msg) {
                    console.log('====================click====================', JSON.stringify(msg));
                    let payload = msg.payload;
                    payload = (new Function("return " + payload))();
                    let msgType = payload.type;
                    let params = decodeURIComponent(payload.params);
                    params = (new Function("return " + params))();
                    if (msgType == 4) {
                        history.push({pathname: `/zbdetail/${params.id}`});
                    } else {
                        history.push({pathname: `/messageNotice/${params.id}/${msgType}`})
                    }
                }, false);

                plus.push.addEventListener("receive", function (msg) {
                    console.log('====================receive====================');
                    console.log(JSON.stringify(msg));
                    _that.getUnreadedMsgNum();
                    let msgBody = undefined;
                    try {
                        let content = JSON.parse(msg.content);
                        msgBody = content.msgBody;
                    } catch (err) {
                        msgBody = msg.content;
                    }
                    let payload = msg.payload;
                    payload.way = "LocalMsg";
                    if (!msg.aps) { // 服务器发来的消息
                        let messageOption = {cover: false, delay: 1};
                        plus.push.createMessage(msgBody, JSON.stringify(payload), messageOption);
                    }
                }, false);
            }
        } catch (plusError) {
            console.log('该浏览器不支持plus')
        }


    }

    getUnreadedMsgNum = () => {
        const {userinfo, history} = this.props;
        axios.post(`${commonUrl}/app/msg/qryUnreadedMsgNum.do`, {userId: userinfo.id})
            .then(res => {
                noAuth(res.data, () => history.push('/login'));
                if (res.data.code === 'success') {
                    this.setState({unReadedMsgNum: res.data.data})
                }
            })
    };

    gowhere = (key) => {
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