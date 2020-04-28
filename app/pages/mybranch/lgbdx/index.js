import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import PartyList from '../components/partyList';
import PartyTab from '../components/partyTab';
import commonUrl from '../../../config/index';
import Topbar from "../../../components/topbar/topbar";
import './style/index.less';
import noAuth from '../../../util/noAuth';

const tabs = [
    {title: '全部活动', key: 't1'},
    {title: '我参与的', key: 't2'},
];

const prefix ="party";

class zbactive extends Component {
    state = {
        items: []
    };

    componentWillMount() {
        this.fetchdata()
    }


    tabonChange = (tab) => {
        this.fetchdata(tab)
    };


    fetchdata = (tab) => {
        const {unitId} = this.props;
        let obj = {};
        obj.actType = "2";
        obj.unitId = unitId;
        if (tab && tab.title === '我参与的') {
            obj.userId = this.props.userid;
        }
        axios.post(`${commonUrl}/app/subAct/getActPageList.do`, obj)
            .then(res => {
                noAuth(res.data,()=>this.props.history.push('/login'))
                if (res.data.code === "success") {
                    this.setState({items: res.data.data.result})
                } else {

                }
            })
    };

    render() {
        return (
            <div className={prefix}>
                <Topbar title="老干部党校" onClick={() => this.props.history.goBack()}/>
                <div className={prefix+"-box"}>
                    <PartyTab tabonChange={this.tabonChange} tabs={tabs}/>
                    <div style={{height: ".2rem"}}/>
                    <PartyList items={this.state.items}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    unitId: state.userinfo.unitId,
    userid: state.userinfo.id
});
const mapdispatchToProps = (dispatch, ownProps) => {
    return {}
};
export default connect(mapStateToProps, mapdispatchToProps)(withRouter(zbactive));