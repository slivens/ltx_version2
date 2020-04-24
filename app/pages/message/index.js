/*
 * @Author: your name
 * @Date: 2019-08-28 16:32:23
 * @LastEditTime: 2019-12-12 16:53:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\message\index.js
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import {SegmentedControl, WingBlank} from 'antd-mobile';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';

import './style/index.less';
import List from './list';
import commonUrl from '../../config';
import Topbar from '../../components/topbar/topbar';
import FooterBar from '../../components/footerBar/footerbar';

import noAuth from '../../util/noAuth';
const data = [
    {
        title: "系统通知",
        content: "您提交的预约要求我们已确定",
        count: 3,
        date: "2019-02-13"
    },
    {
        title: "活动通知",
        content: "您有活动信息待确定",
        count: 2,
        date: "2019-02-13"
    },
    {
        title: "志愿服务消息",
        content: "ok，稍后再说",
        count: 5,
        date: "2019-02-13"
    }
]
class index extends Component {
    state = {
        mesgs: []
    }

    componentWillMount() {
        axios.post(`${commonUrl}/app/queryMsgList.do`, {userId: 9984})
            .then(res => {
                noAuth(res.data, () => this.props.history.push('/login'))
                if (res.data.code === "success") {
                    this.setState({mesgs: res.data.data})
                }
            })
    }

    goHome = () => {
        this.props.history.push('/home');
    };

    render() {
        return (
            <div className="mesg">
                <Topbar title="消息" onClick={this.goHome}/>
                {/* <div className="mesg_select">
                 <SegmentedControl
                 values={['消息', '联系人']}
                 tintColor={'#ff0000'}
                 />
                 </div> */}
                <div className="mesg-list-box">
                    <List>
                        {
                            this.state.mesgs.map(
                                (item, key) => <List.Item key={key} {...item}/>
                            )
                        }
                    </List>
                </div>
                <FooterBar />
            </div>
        );
    }
}

const mapStateToProps = (state, onwporps) => {
    return {
        userId: state.userinfo.id
    }
};
export default connect(mapStateToProps)(withRouter(index));