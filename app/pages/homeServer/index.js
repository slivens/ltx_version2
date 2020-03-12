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
        const obj={title:"金太阳",content:"fasdfadsfdfasdfadsfasdfasdf"} //测试数据
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
                    <ConmonCard
                        item={obj}
                        onClick={() => this.gowhere(item.path)}
                    />
                    </div>
            </div>
        );
    }
}

export default index;