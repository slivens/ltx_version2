import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {SearchBar, Toast} from 'antd-mobile';

import commonUrl from '../../config';
import noAuth from '../../util/noAuth';
import {ConsolationRegister} from "../../redux/actions";
import Topbar from "../../components/topbar/topbar";

import ListView from "./components/listView";
import {consolationMenuData} from './components/data';
import './style/index.less';
import {prefix} from "./prefix";

class TeacherPoolIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listViewData: consolationMenuData
        }
    }

    componentWillMount() {
    }


    render() {
        const {listViewData} = this.state;
        return (
            <div className={prefix}>
                <Topbar title="师资库" onClick={() => this.props.history.goBack()}/>
                <div className={prefix + "-list-box"}>
                    <ListView data={listViewData}/>
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