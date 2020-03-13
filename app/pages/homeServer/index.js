import React, { Component } from 'react';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import ConmonCard from './conmonCard';
import axios from 'axios';
import commonUrl from '../../config';
class index extends Component {
    render() {
        const jzfwData=[
            {
                title:"金太阳",
                content:"提供煮饭洗衣服，病人照料等全方面家政服务项目",
                imgPath:"http://192.168.111.132:8080/app/getMenuImg.do?fn=fc98ed54-c88e-4330-8c05-28397b3db666.png",
                path:"/jintaiyan"
            },
            {
                title:"闽姐姐",
                content:"提供煮饭洗衣服，病人照料等全方面家政服务项目",
                imgPath:"http://192.168.111.132:8080/app/getMenuImg.do?fn=fc98ed54-c88e-4330-8c05-28397b3db666.png"
            }

        ] //测试数据
        return (
            <div className="homeServer">
                <div className="homeServer_topbar">
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
                    家政服务</div>
                    <div className="homeServer_entry">
                    {
                        jzfwData.map((item,idnex)=>
                            <ConmonCard
                                item={item}
                                onClick={() => this.gowhere(item.path)}
                            />
                        )
                    }
                    </div>
            </div>
        );
    }
}

export default index;