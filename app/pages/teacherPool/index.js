import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
    Toast,
    Flex, TextareaItem, List, Badge, Picker
} from 'antd-mobile';
import Avatar from 'antd/es/avatar';
import 'antd/es/avatar/style';
import commonUrl from '../../config';
import noAuth from '../../util/noAuth';
import {ConsolationRegister} from "../../redux/actions";
import Topbar from "../../components/topbar/topbar";
import ListView from '../../components/homeListView/listViewWithData';

import './style/index.less';
import {prefix, listPrefix} from "./prefix";
import {formatName} from "./utils";

const NUM_ROWS = 10; //显示条数

class TeacherPoolIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listViewData: [],
            isLoading: true,
            isRefresh: false,
            typeData: undefined,
            searchClzId: undefined
        }
    }

    componentWillMount() {
        const {searchClzId} = this.state;
        this.fetchData(1, searchClzId);
        this.fetchTypeData();
    }

    fetchData = (pIndex = 1, searchClzId) => {
        let requestParams = {
            pageNumber: pIndex,
            pageSize: NUM_ROWS,
            searchClzId: searchClzId,
            searchName: ""
        };
        axios.post(`${commonUrl}/app/teacherStore/getTeacherPageList.do`, requestParams)
            .then(res => {
                noAuth(res.data, () => this.props.history.push('/login'));
                if (res.data.code === 'success') {
                    this.setState({listViewData: res.data.data.result, isLoading: false})
                }
            })
    };

    fetchTypeData = () => {
        axios.post(`${commonUrl}/app/teacherStore/getTeacherClzList.do`, {})
            .then(res => {
                noAuth(res.data, () => this.props.history.push('/login'));
                if (res.data.code === 'success') {
                    let data = res.data.data;
                    data.map((item, index) => {
                        item.label = item.teacherClass;
                        item.value = item.id;
                    });
                    this.setState({typeData: res.data.data,isLoading: false})
                }
            })
    };

    row = (item, sectionID, rowID) => {
        const getHeadPhoto = (photo) => {
            if (photo) {
                return (
                    <img src={photo} key={`headPhoto{index}`} onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${commonUrl}/app/getUploadImg.do?fn=default.jpg`
                    }}/>
                )
            } else {
                return (
                    <Avatar size={60} icon="user"/>
                )
            }
        };
        return (
            <div onClick={() => this.goDetail(item.id)} key={rowID} className={listPrefix + "_item"}>
                <div className={listPrefix + "_item_avatar"}>
                    {getHeadPhoto(item.photo)}
                </div>
                <div className={listPrefix + "_item_right"}>
                    <div className={listPrefix + "_item_right_title"}>
                        {/*<div >{formatName(item.name)}</div>*/}
                        <div>{formatName(item.name)}</div>
                        <Badge text={item.teacherClass} style={{backgroundColor: '#71a9fe'}}/>
                        {/*<div dangerouslySetInnerHTML={{__html:item.abstractInfo}} className="content"/>*/}
                    </div>
                    <div
                        className={listPrefix + "_item_right_des"}>{/*className="homeListView_item_right-bottom"*/}
                        {item.intro}
                    </div>
                </div>
            </div>
        )
    };

    onPickerChange = (v) => {
        this.setState({searchClzId: v, isRefresh: true});
        this.fetchData(1, v[0]);
    };


    goDetail = (id) => {
        // this.props.history.push(`/partyDetail/${id}`)
        this.props.history.push(`/teacherPoolDetail/${id}`)

    };


    render() {
        const {listViewData, typeData, isLoading, isRefresh} = this.state;
        return (
            <div className={prefix}>
                <Topbar title="师资库" onClick={() => this.props.history.goBack()}/>
                <Picker
                    title="专家类型"
                    extra="请选择专家类型"
                    data={typeData}
                    cols={1}
                    value={this.state.searchClzId}
                    onChange={this.onPickerChange}
                >
                    <List.Item arrow="horizontal" onClick={this.onClick}>专家类型</List.Item>
                </Picker>
                <div className={prefix + "-list-box"}>
                    {/* <ListView data={listViewData}/>*/}
                    <ListView
                        data={listViewData}
                        row={this.row}
                        useBodyScroll={false}
                        isLoading={isLoading}
                        refreshing={isRefresh}
                        fetchData={this.fetchData}
                    />
                </div>
            </div>
        );
    }
}

export default connect(null, null)(withRouter(TeacherPoolIndex));