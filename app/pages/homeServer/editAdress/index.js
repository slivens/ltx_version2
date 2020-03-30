import React, { Component } from 'react';
import { List, Checkbox, Flex, WhiteSpace, TextareaItem, Button, Picker, Tag, Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import "./style/index.less";
import Sex from './sexComp';
import Axios from 'axios';
const prefix = "editadress";
import commonUrl from '../../../config';
const Item = List.Item;
const Brief = Item.Brief;
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
const caseData = [

    {
        label: '地方A',
        value: '地方A',
    },
    {
        label: '地方B',
        value: '地方B',
    },
    {
        label: '地方C',
        value: '地方C',
    },
    {
        label: '地方D',
        value: '地方D',
    },



]
class index extends Component {
    constructor(props){
        super(props)
        this.state = {
            adress: "",
            sex: this.props.addressData[0].gender||undefined
        }
    }
   
    saveAddress = () => {
        const { sex } = this.state;
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            console.log('@value', value)
            const obj = { ...value, gender: sex, userId: this.props.userinfo.id,address:"福州",addressId:""}
            if (!obj.contactPerson) {
                Toast.info('请输入联系人')
                return
            }
            if (obj.gender === undefined) {
                Toast.info('请选择性别')
                return
            }
            if (!obj.contactNum) {
                Toast.info("请输入联系电话")
                return
            }
            if (!obj.addressDetail) {
                Toast.info('请输入详细地址')
                return
            }
            if(this.props.addressData[0]){
                Axios.post(`${commonUrl}/app/homeService/saveAddress.do`, {...obj,addressId:this.props.addressData[0].id})
                    .then(res => {
                        if (res.data.code === 'success') {
                            Toast.success('修改成功')
                        }
                    })
            }else{

                Axios.post(`${commonUrl}/app/homeService/saveAddress.do`, obj)
                    .then(res => {
                        if (res.data.code === 'success') {
                            Toast.success('保存成功')
                        }
                    })
            }
        });
    }
    render() {
        const { sex } = this.state;
        const { getFieldProps } = this.props.form;
        const {addressData}=this.props;
        console.log('@@@@@@@@@@',sex,addressData)
        return (
            <div className={prefix}>
                <div className={prefix + "_topbar"}>
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
                    编辑服务地址
                </div>
                <div className={prefix + "_box"}>
                    <WhiteSpace />
                    <List>
                        <Item style={{ paddingLeft: 0 }}
                            extra={<div><Sex checked={parseInt(sex)} onChange={() => this.setState({ sex: 1 })} name="先生" />&nbsp;
                            <Sex checked={sex === undefined ?parseInt(sex):!parseInt(sex)} onChange={() => this.setState({ sex: 0 })} name="女士" /></div>}
                        >
                            <TextareaItem
                                {...getFieldProps('contactPerson',{initialValue:addressData[0].contactPerson})}
                                arrow="horizontal"
                                title="联系人"
                                placeholder="请输入联系人"
                                clear
                            />
                        </Item>
                        <TextareaItem
                            {...getFieldProps('contactNum',{initialValue:addressData[0].contactNum})}
                            title="联系电话"
                            placeholder="请输入联系人电话"
                            clear
                        />
                        {/*
                            <Picker
                                value={this.state.adress}
                                onChange={adress => this.setState({ adress})}
                                data={caseData}
                                cols={1} >
                                <List.Item className="pushTime" arrow="horizontal">所在地区</List.Item>
                            </Picker>
                        */}
                        <TextareaItem
                            {...getFieldProps('addressDetail',{initialValue:addressData[0].addressDetail})}
                            title="详细地址"
                            placeholder="请输入详细地址"
                            clear
                        />
                    </List>
                </div>
                <div className={prefix + "_activebtn"}>
                    <Flex style={{ height: "100%" }} align="center" justify="center">
                        <Button
                            onClick={this.saveAddress}
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                                width: "80%",
                                margin: "0 auto",
                                background: "#f83e2f",
                                // marginLeft:".1rem"
                            }}
                        >保存服务地址</Button>
                    </Flex>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownprops) => {
    return {
        userinfo: state.userinfo,
        addressData:state.address
    }
}
const mapDispatchToProps = (dispatch, ownprops) => {
    return {

    }
}
const reduxLogin = withRouter(createForm()(index));
export default connect(mapStateToProps, mapDispatchToProps)(reduxLogin);