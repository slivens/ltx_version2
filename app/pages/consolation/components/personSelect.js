import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';
import {List, Checkbox, Flex, SearchBar} from 'antd-mobile';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import commonUrl from '../../../config';
import {CondolationObjectData} from '../../../redux/actions';
import ConfirmFooterbar from "./confirmFooterbar";
import Topbar from "./topbar";
import './style/index.less';
import {person} from "./data";

const CheckboxItem = Checkbox.CheckboxItem;

class PersonSelect extends React.Component {
    state = {
        objectData: []
    };
    selectList = [];

    componentWillMount() {
        const {objectData} = this.props;
        if (objectData.length) {
            this.setState({objectData: objectData});
            return
        }
        this.fechData()
    }

    fechData = (username) => {
        this.setState({objectData: person.data});
        this.props.dispatchObjectData(person.data)
        /*Axios.post(`${commonUrl}/app/activity/findMemberByBranchId.do`,
            {branchId: this.props.userinfo.partyBranchId, username})
            .then(res => {
                if (res.data.code === 'success') {
                    this.setState({objectData: res.data.data});
                    if (!username) {
                        this.props.dispatchObjectData(res.data.data)
                    }
                }
            })*/
    };


    onChange = (e, obj) => {
        const {objectData} = this.props;
        objectData.forEach((item, index) => {
            if (item.value === obj.value) {
                objectData[index].checked = e.target.checked
            }
        });
        this.props.dispatchObjectData(objectData)
    };
    SearchChange = (e) => {
        const username = this.searchText.state.value;
        const {objectData} = this.props;
        if (!username && objectData.length) {
            this.setState({objectData: objectData});
            return
        }
        this.fechData(username)
    };

    render() {
        const {objectData} = this.state;
        const {onClose} = this.props;
        return (
            <div className="selectMember">
                <Topbar title="慰问对象" onClick={onClose}/>
                <SearchBar
                    ref={ref => this.searchText = ref}
                    placeholder="搜索..." maxLength={20}
                    onBlur={this.SearchChange}/>
                <div className="selectMember-box">
                    <List >
                        {objectData.map(i => (
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
        objectData: state.condolationObject
    }
};
const mapDispatchToProps = (dispatch, ownprops) => {
    return {
        dispatchObjectData: (value) => {
            dispatch(CondolationObjectData(value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PersonSelect))
