import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {SearchBar, Toast} from 'antd-mobile';

import commonUrl from '../../../config';
import noAuth from '../../../util/noAuth';
import {ConsolationRegister} from "../../../redux/actions";

import ListView from "../components/listView";
import Topbar from "../components/topbar";
import AddFooterBar from "../components/addFooterbar";
import {registerPath, detailPath} from "./resources";
import '../style/consolation.less';
import {prefix} from "../prefix";
import {condolencesType} from "./resources";

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
        let params = {condolencesType:condolencesType, registUnit: unitId, condolencesObject: searchContent};
        Toast.loading('Loading...', 0);
        axios.post(`${test}/app/condolences/findCondolencesList.do`, params)
            .then(res => {
                    noAuth(res.data, () => this.props.history.push('/login'));
                    if (res.data.code === 'success') {
                        this.setState({listViewData: res.data.data});
                        Toast.hide();
                    } else {
                        Toast.hide();
                        Toast.fail(res.message)
                    }
                }
            );
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