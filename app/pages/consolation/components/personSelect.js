import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {List, Checkbox, Flex, SearchBar} from 'antd-mobile';
import 'antd/es/icon/style';
import {CondolationObjectData, CondolationObjectChange} from '../../../redux/actions';
import ConfirmFooterbar from "./confirmFooterbar";
import Topbar from "./topbar";
import './style/index.less';

const CheckboxItem = Checkbox.CheckboxItem;

const test = "http://127.0.0.1:8088";

class PersonSelect extends React.Component {
    state = {
        objectData: []
    };
    selectList = [];

    componentWillMount() {
        const {objectData, module} = this.props;
        let temp = objectData[module];
        if (temp && temp.length) {
            this.setState({objectData: temp});
            return
        }
        this.fechData()
    }

    fechData = (username) => {
        const {module} = this.props;
        // {unitId: this.props.userinfo.unitId, username}
        //"8d11716e-f71a-47ae-aacc-a21dd0412323"
        axios.post(`${test}/app/user/findWorkerList.do`, {unitId: "8d11716e-f71a-47ae-aacc-a21dd0412323", username})
            .then(res => {
                if (res.data.code === 'success') {
                    this.setState({objectData: res.data.data});
                    if (!username) {
                        console.log('hahahha')
                        this.props.dispatchObjectData(res.data.data, module)
                    }
                }
            })
    };


    onChange = (e, obj) => {
        const {objectData, module} = this.props;
        let temp = objectData[module];
        let result = [];
        temp.map((item, index) => {
            if (item.value === obj.value) {
                item = {...item,checked:e.target.checked};
                console.log(item,obj)
                result.push(item);
            } else {
                result.push(item);
            }
        });
        this.props.dispatchObjectData(result, module);
        this.props.dispatchObjectChange(module);
    };
    SearchChange = (e) => {
        const username = this.searchText.state.value;
        const {objectData, module} = this.props;
        let temp = objectData[module];
        if (!username && temp.length) {
            this.setState({objectData: temp});
            return
        }
        this.fechData(username)
    };

    render() {
        const {objectData} = this.state;
        const {onClose, defaultCheckValues} = this.props;
        objectData.forEach((objectItem) => {
            let defaultDatas = defaultCheckValues.split(",");
            defaultDatas.forEach((defaultItem) => {
                //objectItem.value === defaultItem
                if (objectItem.value == defaultItem) {
                    objectItem.checked = true;
                }
            })

        });

        return (
            <div className="selectMember">
                <Topbar title="慰问人员" onClick={onClose}/>
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
        dispatchObjectData: (value, module) => {
            dispatch(CondolationObjectData(value, module))
        },
        dispatchObjectChange: (module) => {
            dispatch(CondolationObjectChange(module));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PersonSelect))
