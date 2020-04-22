/*
 * @Author: your name
 * @Date: 2019-08-30 13:25:13
 * @LastEditTime: 2020-01-15 11:18:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\components\footerBar\footerbar.js
 */
import React, {Component} from 'react';
import './style/index.less';
// import Icon from 'antd/es/icon';
// import 'antd/es/icon/style';
import {Flex, Badge} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import Icon from '../icon';
class footerbar extends Component {
    gowhere = (key) => {
        this.props.history.push(key)
    }

    render() {
        const {history, location} = this.props;
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
                            <Badge overflowCount={99} text={0} style={{marginTop:'5px'}}>
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
export default withRouter(footerbar);