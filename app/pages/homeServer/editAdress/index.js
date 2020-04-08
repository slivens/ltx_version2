import React, { Component } from 'react';
import { List, Checkbox, Flex, WhiteSpace, TextareaItem, Button, Picker, Tag, Toast, InputItem } from 'antd-mobile';
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
import noAuth from '../../../util/noAuth';
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
    constructor(props) {
        super(props)

        this.state = {
            value: '',
            hasError: false,
            adress: "",
            sex: this.props.addressData[0] ? this.props.addressData[0].gender : undefined
        }
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入11位手机号码');
        }
    }
    phoneonChange = (value) => {
        console.log('@@@@@@@value',value)
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value,
          });
    }
    saveAddress = () => {
        const { sex } = this.state;
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            console.log('@value', value)
            const obj = { ...value, gender: sex, userId: this.props.userinfo.id, address: "福州" }
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
            if (obj.contactNum&&obj.contactNum.replace(/\s/g, '').length < 11) {
                Toast.info('请输入11位手机号码');
                return
            }
            if (!obj.addressDetail) {
                Toast.info('请输入详细地址')
                return
            }
            console.log(this.props.addressData[0])
            if (this.props.addressData[0]) {
                Axios.post(`${commonUrl}/app/homeService/saveAddress.do`, { ...obj, addressId: this.props.addressData[0].id })
                    .then(res => {
                        noAuth(res.data,()=>this.props.history.push('/login'))
                        if (res.data.code === 'success') {
                            Toast.success('修改成功', 2, () => this.props.history.goBack())

                        } else {
                            Toast.fail(`失败${res.data.message}`)
                        }
                    })
            } else {

                Axios.post(`${commonUrl}/app/homeService/saveAddress.do`, obj)
                    .then(res => {
                        noAuth(res.data,()=>this.props.history.push('/login'))
                        if (res.data.code === 'success') {
                            Toast.success('修改成功', 2, () => this.props.history.goBack())
                        } else {
                            Toast.fail(`失败${res.data.message}`)
                        }
                    })
            }
        });
    }
    render() {
        const { sex } = this.state;
        const { getFieldProps } = this.props.form;
        const { addressData } = this.props;
        let addressObj
        if (!this.props.addressData[0]) {
            addressObj = {
                contactPerson: "",
                contactNum: "",
                addressDetail: ""
            }
        } else {
            addressObj = {
                contactPerson: addressData[0].contactPerson,
                contactNum: addressData[0].contactNum,
                addressDetail: addressData[0].addressDetail
            }
        }

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
                            <Sex checked={sex === undefined ? parseInt(sex) : !parseInt(sex)} onChange={() => this.setState({ sex: 0 })} name="女士" /></div>}
                        >
                            <TextareaItem
                                {...getFieldProps('contactPerson', { initialValue: addressObj.contactPerson })}
                                arrow="horizontal"
                                title="联系人"
                                placeholder="请输入联系人"
                                clear
                            />
                        </Item>
                        <InputItem
                            {...getFieldProps('contactNum',{initialValue:addressObj.contactNum+""})}
                            className="pushTime"
                            type="phone"
                            placeholder="请输入手机号码"
                            // error={this.state.hasError}
                            // onErrorClick={this.onErrorClick}
                            // onChange={this.phoneonChange}
                            // value={this.state.value}
                        >手机号码</InputItem>
                        {/*<TextareaItem
                            {...getFieldProps('contactNum',{initialValue:addressObj.contactNum+""})}
                            title="联系电话"
                            placeholder="请输入联系人电话"
                            clear
                        />*/}
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
                            {...getFieldProps('addressDetail', { initialValue: addressObj.addressDetail })}
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
        addressData: state.address
    }
}
const mapDispatchToProps = (dispatch, ownprops) => {
    return {

    }
}
const reduxLogin = withRouter(createForm()(index));
export default connect(mapStateToProps, mapDispatchToProps)(reduxLogin);
