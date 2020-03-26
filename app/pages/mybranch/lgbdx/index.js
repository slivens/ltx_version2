import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import PartyList from '../components/partyList';
import PartyTab from '../components/partyTab';
import commonUrl from '../../../config/index';
import './style/index.less';

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
        let tab = localStorage.getItem('branch_tab');
        if (tab) {
            this.fetchdata(JSON.parse(tab));
        } else {
            this.fetchdata()
        }
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
        axios.post(`${commonUrl}/app/subAct/getActList.do`, obj)
            .then(res => {
                if (res.data.code === "success") {
                    this.setState({items: res.data.data})
                } else {

                }
            })
    };

    render() {
        return (
            <div className={prefix}>
                <div className={prefix+"_topbar"}>
                    <Icon
                        onClick={() => this.props.history.goBack()}
                        style={{
                            position: "absolute",
                            left: ".1rem",
                            top: "50%",
                            color: "#F7F8F4",
                            fontSize: ".24rem",
                            transform: "translateY(-50%)"
                        }}
                        type="left"
                    />
                    老干部党校
                    <Icon
                        type="menu"
                        style={{
                            position: "absolute",
                            right: ".1rem",
                            top: "50%",
                            color: "#F7F8F4",
                            fontSize: ".18rem",
                            transform: "translateY(-50%)"
                        }}
                        onClick={() => {
                        }}
                    />
                </div>
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