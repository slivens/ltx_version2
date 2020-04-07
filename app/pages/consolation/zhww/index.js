import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {SearchBar, Toast} from 'antd-mobile';

import commonUrl from '../../../config';
import {ConsolationRegister} from "../../../redux/actions";

import {listViewData} from "../components/data";
import ListView from "../components/listView";
import Topbar from "../components/topbar";
import AddFooterBar from "../components/addFooterbar";
import {registerPath, detailPath} from "./path";
import '../style/consolation.less';
import {prefix} from "../prefix";

const test = "http://127.0.0.1:8088";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listViewData: []
        }
    }

    componentWillMount() {
        this.getListViewData();
    }

    SearchChange = (searchContent) => {
        this.getListViewData(searchContent);
    };

    getListViewData = (searchContent) => {
        const {unitId} = this.props;
        let params = {condolencesType: "4", unitId: unitId};
        Toast.loading('Loading...', 0);
        axios.post(`${commonUrl}/app/condolences/findCondolencesList.do`, params)
            .then(res => {
                    if (res.data.code === 'success') {
                        this.setState({listViewData: res.data.data.result});
                        Toast.hide();
                    } else {
                        Toast.hide();
                        Toast.fail(res.data.message)
                    }
                }
            )
    };

    render() {
        const {listViewData} = this.state;
        return (
            <div className={prefix}>
                <Topbar title="灾后慰问" onClick={() => this.props.history.goBack()}/>
                <SearchBar placeholder="搜索..." maxLength={20} onChange={this.SearchChange}/>
                <div className={prefix+"-list-box"}>
                    <ListView data={listViewData} registerPath={registerPath} detailPath={detailPath}/>
                </div>
                <AddFooterBar registerPath={registerPath}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownprops) => {
    return {
        unitId: state.userinfo.unitId,
    }
};
export default connect(mapStateToProps, null)(withRouter(index));