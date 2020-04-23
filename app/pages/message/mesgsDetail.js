/*
 * @Author: slivens
 * @Date: 2019-11-22 10:41:38
 * @LastEditTime: 2019-12-12 16:54:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\message\mesgsDetail.js
 */
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import {connect} from 'react-redux';
import {WhiteSpace, Toast} from 'antd-mobile';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import commonUrl from '../../config';
import noAuth from '../../util/noAuth';
import ListView from '../../components/homeListView/listViewWithData';
import Topbar from '../../components/topbar/topbar';
import "./style/index.less";
import {msgRecordList} from './data';

const test = "http://127.0.0.1:8088";
const NUM_ROWS = 5; //显示条数

class mesgsDetail extends Component {
    state = {
        mesgsList: [],
        isLoading: true,
    };

    componentWillMount() {
        this.fetchData();
    }

    fetchData = (pIndex = 1) => {
        const {history, location} = this.props;
        if (location.params) {
            const {params: {id, params}} = location;
            let requestParams = {
                pageNumber: pIndex,
                pageSize: NUM_ROWS,
                msgType: id
            };
            axios.post(`${test}/app/msg/qryMsgRecordPageList.do`, requestParams)
                .then(res => {
                    noAuth(res.data, () => history.push('/login'));
                    let data = [];
                    data = data.concat(res.data.data.result);
                    if (res.data.code === 'success') {
                        this.setState({mesgsList: data, isLoading: false})
                    }
                })
        } else {
            this.goMessage();
        }
        //
        console.log(location);
        //this.setState({mesgsList: msgRecordList.data, isLoading: false});
        /*
         */
        /* 旧版本消息获取
         axios.post(`${commonUrl}/app/qryMsgRecordList.do`, {userId: 9984, recordId: id, params})
         .then(res => {
         noAuth(res.data, () => this.props.history.push('/login'));
         if (res.data.code === 'success') {
         this.setState({mesgsList: res.data.data})
         }
         })*/
    };

    readinfo = ({id, params, type}) => {
        const {history, location} = this.props;
        let fomatParams = JSON.parse(params);
        if (type === 4) {
            history.replace({pathname: `/zbdetail/${fomatParams.id}`})
        } else {
            history.replace({pathname: `/messageNotice/${fomatParams.id}`})
        }
        axios.post(`${commonUrl}/app/readMsgRecord.do`, {userId: 9984, recordId: id, params})
            .then(res => {
                noAuth(res.data, () => this.props.history.push('/login'));
                if (res.data.code === 'success') {
                }
            })
    };
    row = (item, sectionID, rowID) => {
        return (
            <div key={rowID} className="mesgDetail_item" onClick={() => this.readinfo(item)}>
                <WhiteSpace size="lg"/>
                <div className="date"><span>{item.createTime}</span></div>
                <div className="mesgDetail_item_card">
                    <div className="title">
                        {
                            item.readed && <span className="dot"/>
                        }
                        <span className="word">{item.title}</span></div>
                    <div className="content">发件人：{item.sendName}</div>
                    <div className="detail">查看详情
                        <Icon
                            style={{
                                position: "absolute",
                                right: ".1rem",
                                top: "50%",
                                color: "#bbb",
                                fontSize: ".24rem",
                                transform: "translateY(-50%)"
                            }} type="right"/>
                    </div>
                </div>
            </div>
        )
    };
    goMessage = () => {
        this.props.history.push('/message');
    };

    render() {
        const {history, location} = this.props;
        const {isLoading, mesgsList} = this.state;
        if (location.params) {
            const {params: {title, id, params}} = location;
            return (
                <div className="mesgDetail">
                    <Topbar title={title} onClick={() => this.props.history.goBack()}/>
                    <div className="mesg-detail-list-box">
                        <ListView
                            data={mesgsList}
                            row={this.row}
                            useBodyScroll={false}
                            isLoading={isLoading}
                            fetchData={this.fetchData}
                        />
                    </div>

                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}
const mapStateToProps = (state, onwporps) => {
    return {
        userId: state.userinfo.id
    }
};
export default connect(mapStateToProps)(withRouter(mesgsDetail));