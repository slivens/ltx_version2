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

    componentDidMount() {
        // 监听plusready事件
        document.addEventListener("plusready", function () {
            // 扩展API加载完毕，现在可以正常调用扩展API
            // 添加监听从系统消息中心点击某条消息启动应用事件
            //监听系统通知栏消息点击事件
            plus.push.addEventListener("click", function(msg) {
                // if ( msg.aps ){
                // 	// 个推pushAPNMessageToSingle接口推送的aps消息
                // 	var jsonPayload = JSON.parse(msg.aps.category);//通过category实现透传字段传值
                // 	//实现打开应用的特定业务单据详情页面
                // 	wrhFunc.openWin('/html/share/shareDetail.html',{bussId:jsonPayload.shareId});
                // 	return;
                // }
                // // 点击应用在前端时，创建的本地消息
                // var jsonPayload = JSON.parse(msg.payload);
                // if("YES" == jsonPayload.localMSG){
                // 	wrhFunc.openWin('/html/share/shareDetail.html',{shareId:jsonPayload.shareId});
                // }
                // plus.push.createMessage("...click..." + channelId);
                console.log("...click..." + JSON.stringify(msg));
                plus.nativeUI.toast("请到电脑上查看消息详情！");
            }, false );

            // 获取个推服务端编程透传的消息，
            plus.push.addEventListener("receive", function(msg) {
                console.log("deviceType" + window.deviceType + "...receive..." + JSON.stringify(msg));
                var msgPushVo = JSON.parse(msg.content);
                var playloadObj = {type: msgPushVo.type, params: msgPushVo.params, way: "LocalMsg"};
                if (window.deviceType == "Android" || (window.deviceType == "iOS" && msg.payload.way != "LocalMSG")) {
                    // Android 消息处理 {"__UUID__":"androidPushMsg3649915","title":"福建老干部","content":"后台内容","payload":"后台内容"}
                    plus.push.createMessage(msgPushVo.msgBody, playloadObj);
                    return;
                }
                // if (window.deviceType == "iOS" && msg.payload.way != "LocalMSG") {
                // 	// ios 消息处理
                // 	plus.push.createMessage(msg.content, "LocalMSG");
                // }
                if (msg.aps){
                    // 服务器发来的消息
                    var jsonPayload = JSON.parse(msg.aps.category);
                    // 创建本地消息
                    if('NO' == jsonPayload.localMSG){//个推推送的消息
                        // 创建本地消息提示,并延迟显示
                        var messageOption = {cover:false,delay:1};
                        jsonPayload.localMSG = "YES";
                        // iOS下，创建本地消息没有声音。
                        plus.push.createMessage("好友发布了分享，请点击查看", JSON.stringify(jsonPayload), messageOption );
                    }
                    plus.push.createMessage("...服务器发送过来..." + channelId, "LocalMSG");
                }
            }, false);
        }, false);
    }

    gowhere = (key) => {
        this.props.history.push(key)
    };

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
                            <Badge overflowCount={99} text={0} style={{marginTop: '5px'}}>
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