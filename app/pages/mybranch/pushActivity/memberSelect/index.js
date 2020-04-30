import React, { Component } from 'react';
import { List, Checkbox, Flex, SearchBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import Axios from 'axios';
import commonUrl from '../../../../config';
import { connect } from 'react-redux';
import {AddAllMemberData} from '../../../../redux/actions';
import noAuth from '../../../../util/noAuth';
const CheckboxItem = Checkbox.CheckboxItem;


class MemberSelect extends React.Component {
    state = {
        memberData: []
    }
    selectList=[]
    onChange = (e,obj) => {
        const {allmember}=this.props;
        allmember.forEach((item,index)=>{
            if(item.value===obj.value){
                allmember[index].checked=e.target.checked
            }
        })
        this.props.AddAllMemberData(allmember)
    }
    SearchChange=(e)=>{
        const username=this.searchText.state.value;
        const {allmember}=this.props;
        if(!username&&allmember.length){
            this.setState({ memberData: allmember })
            return
        }
        this.fechData(username)
    }
    fechData=(username)=>{
            Axios.post(`${commonUrl}/app/activity/findMemberByBranchId.do`, 
            { branchId: this.props.userinfo.partyBranchId,username })
                .then(res => {
                    noAuth(res.data,()=>this.props.history.push('/login'))
                    if (res.data.code === 'success') {
                        this.setState({ memberData: res.data.data })
                        if(!username){
                            this.props.AddAllMemberData(res.data.data)
                            
                        }
                    }
                })
    }
    componentWillMount() {
        const {allmember}=this.props;
        if(allmember.length){
            this.setState({ memberData: allmember })
            return
        }
      this.fechData()

    }
    render() {
        const { memberData } = this.state;
        const {allmember,onClose}=this.props;
        return (
            <div className="selectMember">
                <div className="selectMember_topbar">
                    <Icon
                        onClick={onClose}
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
                    邀请人员
                </div>
                <SearchBar 
                onCancel={(val) => console.log(val)}
                ref={ref => this.searchText = ref} 
                placeholder="搜索..." maxLength={20} 
                onBlur={this.SearchChange} />
                <div className="selectMember-box">
                    <List >
                        {memberData.map(i => (
                            <CheckboxItem defaultChecked={i.checked} key={i.value} onChange={(e) => this.onChange(e,i)}>
                                {i.label}
                            </CheckboxItem>
                        ))}
                    </List>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownprops) => ({
    userinfo: state.userinfo,
    allmember:state.allMemberData
})
const mapDispatchToProps = (dispatch, ownprops) => {
    return {
        AddAllMemberData: (value) => {
            dispatch(AddAllMemberData(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MemberSelect))
