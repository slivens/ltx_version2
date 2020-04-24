import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {
    SearchBar, Toast,
    Flex, TextareaItem, List, Badge
} from 'antd-mobile';
import Avatar from 'antd/es/avatar';
import 'antd/es/avatar/style';
import commonUrl from '../../config';
import noAuth from '../../util/noAuth';
import {ConsolationRegister} from "../../redux/actions";
import Topbar from "../../components/topbar/topbar";
import ListView from '../../components/homeListView/listViewWithData';

/*import ListView from "./components/listView";*/
import {consolationMenuData} from './components/data';
import './style/index.less';
import {prefix, listPrefix} from "./prefix";
import {formatName} from "./utils";

class TeacherPoolIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listViewData: consolationMenuData,
            isLoading: true
        }
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData = () => {
        const {history, location} = this.props;
        /*  const {params: {title, id, params}} = location;*/
        this.setState({listViewData: consolationMenuData, isLoading: false})
        /* axios.post(`${test}/app/msg/qryMsgRecordPageList.do`, {pageNumber: 1, pageSize: 10000, msgType: "2"})
         .then(res => {
         noAuth(res.data, () => this.props.history.push('/login'));
         if (res.data.code === 'success') {
         this.setState({mesgsList: res.data.data.result, isLoading: false})
         }
         })*/
    };

    row = (item, sectionID, rowID) => {
        return (
            <div onClick={() => this.goDetail(item.id)} key={rowID} className={listPrefix + "_item"}>
                <div className={listPrefix + "_item_avatar"}>
                    <Avatar size={60} icon="user"/>
                </div>
                <div className={listPrefix + "_item_right"}>
                    <div className={listPrefix + "_item_right_title"}>
                        <div >{formatName(item.name)}</div>
                        <Badge text={item.mark} style={{backgroundColor: '#71a9fe'}}/>
                        {/*<div dangerouslySetInnerHTML={{__html:item.abstractInfo}} className="content"/>*/}
                    </div>
                    <div
                        className={listPrefix + "_item_right_des"}>{/*className="homeListView_item_right-bottom"*/}
                        {item.des}
                    </div>
                </div>
            </div>
        )
    };


    goDetail = (id) => {
        // this.props.history.push(`/partyDetail/${id}`)
        this.props.history.push(`/teacherPoolDetail`)

    };


    render() {
        const {listViewData, isLoading} = this.state;
        return (
            <div className={prefix}>
                <Topbar title="师资库" onClick={() => this.props.history.goBack()}/>
                <div className={prefix + "-list-box"}>
                    {/* <ListView data={listViewData}/>*/}
                    <ListView
                        data={listViewData}
                        row={this.row}
                        useBodyScroll={false}
                        isLoading={isLoading}
                        fetchData={this.fetchData}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownprops) => {
    return {
        unitId: state.userinfo.unitId,
    }
};
export default connect(null, null)(withRouter(TeacherPoolIndex));