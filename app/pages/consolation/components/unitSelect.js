import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';
import {List, Checkbox, Flex, SearchBar} from 'antd-mobile';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import commonUrl from '../../../config';
import {CondolationUnitData} from '../../../redux/actions';
import ConfirmFooterbar from "./confirmFooterbar";
import Topbar from "./topbar";
import './style/index.less';
import {person1} from "./data";

const CheckboxItem = Checkbox.CheckboxItem;

class UnitSelect extends React.Component {
    state = {
        unitData: []
    };
    selectList = [];

    componentWillMount() {
        const {unitData} = this.props;
        if (unitData.length) {
            this.setState({unitData: unitData});
            return
        }
        this.fechData()
    }

    fechData = (username) => {
        this.setState({unitData: person1.data});
        this.props.dispatchUnitData(person1.data)
        /* Axios.post(`${commonUrl}/app/activity/findMemberByBranchId.do`,
         {branchId: this.props.userinfo.partyBranchId, username})
         .then(res => {
         if (res.data.code === 'success') {
         this.setState({objectData: res.data.data});
         if (!username) {
         this.props.dispatchUnitData(res.data.data)
         }
         }
         })*/
    };


    onChange = (e, obj) => {
        const {unitData} = this.props;
        unitData.forEach((item, index) => {
            if (item.value === obj.value) {
                unitData[index].checked = e.target.checked
            }
        });
        this.props.dispatchUnitData(unitData)
    };
    SearchChange = (e) => {
        const username = this.searchText.state.value;
        const {unitData} = this.props;
        if (!username && unitData.length) {
            this.setState({unitData: objectData});
            return
        }
        this.fechData(username)
    };

    render() {
        const {unitData} = this.state;
        const {onClose} = this.props;
        return (
            <div className="selectMember">
                <Topbar title="慰问单位" onClick={onClose}/>
                <SearchBar
                    ref={ref => this.searchText = ref}
                    placeholder="搜索..." maxLength={20}
                    onBlur={this.SearchChange}/>
                <div className="selectMember-box">
                    <List >
                        {unitData.map(i => (
                            <CheckboxItem defaultChecked={i.checked} key={i.value}
                                          onChange={(e) => this.onChange(e, i)}>
                                {i.label}
                            </CheckboxItem>
                        ))}
                    </List>
                </div>
                <ConfirmFooterbar confirm={onClose}/>
            </div>
        );
    }
}
const mapStateToProps = (state, ownprops) => {
    return {
        userinfo: state.userinfo,
        unitData: state.condolationUnit
    }
};
const mapDispatchToProps = (dispatch, ownprops) => {
    return {
        dispatchUnitData: (value) => {
            dispatch(CondolationUnitData(value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UnitSelect))
