import React, { Component } from 'react';
import { List, Checkbox, Flex, WhiteSpace, TextareaItem, Button, Badge, DatePicker, Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import "./style/index.less";
import Skeleton from 'antd/es/skeleton';
import 'antd/es/skeleton/style';
import { connect } from 'react-redux';
import Axios from 'axios';
const prefix = "yuyue"
const Item = List.Item;
const Brief = Item.Brief;
import commonUrl from '../../../config';
import { Address } from '../../../redux/actions';
import { createForm } from 'rc-form';
class index extends Component {
    state = {
        serverTime: "",
        adressinfo: []
    }
    componentWillMount() {
        const { userinfo } = this.props;
        Axios.post(`${commonUrl}/app/homeService/getMyAddressList.do`, { userId: userinfo.id })
            .then(res => {
                if (res.data.code === 'success') {
                    this.setState({ adressinfo: res.data.data })
                    this.props.ADD_address(res.data.data)
                }
            })
    }
    saveOrder = () => {
        this.props.form.validateFields((error, value) => {
            const { homeCompany, userinfo, addressData } = this.props;
            console.log(error, value);
            let serverID = []
            homeCompany.selectList.forEach((item, index) => {
                if (item.checked) {
                    serverID.push(item.id)
                }
            })
            if(!addressData[0].contactPerson){
                Toast.info("请填写完整地址信息")
            }
            if (!serverID.join()) {
                Toast.info("请选择服务")
                return
            }
            if (!value.serviceTime) {
                Toast.info("请选择服务时间")
                return
            }
            const obj = {
                ...value,
                companyId: homeCompany.id,
                userId: userinfo.id,
                contactPerson: addressData[0].contactPerson,
                contactNum: addressData[0].contactNum,
                serviceAddre:"",
                companyName: homeCompany.companyName,
                orderServiceIds: serverID.join(),
                contactGender:addressData[0].gender,
                detailAdd:addressData[0].addressDetail,
            }
            Axios.post(`${commonUrl}/app/homeService/saveOrder.do`, obj)
                .then(res => {
                    if (res.data.code === 'success') {
                        Toast.success('保存成功')
                    } else {
                        Toast.fail(`保存失败:${res.message}`)
                    }
                }).catch(err => {
                    Toast.fail(`保存失败:${err}`)
                })
        })
    }
    render() {
        const { selectList, companyName } = this.props.homeCompany;
        const { addressData } = this.props;
        const { getFieldProps } = this.props.form;

        const { adressinfo } = this.state;
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
                    预约
                </div>
                <WhiteSpace />
                <List>
                    <Item
                        onClick={() => this.props.history.push("/editAdress")}
                        arrow="horizontal"
                        thumb={<Icon type="environment" style={{ color: "#f83e2f", fontSize: ".24rem" }} />}
                        multipleLine
                    >
                        {
                            addressData[0] ?
                                <div>
                                    {addressData[0].addressDetail}
                                    <div style={{ color: "#888", fontSize: ".15rem" }}>
                                        {addressData[0].contactPerson}
                                        <Badge text={addressData[0].gender === "1" ? "先生" : "女士"}
                                            style={{ backgroundColor: addressData[0].gender === "1" ? '#40a9ff' : "#faad14", marginLeft: 5 }} />
                                        <span style={{ marginLeft: 10 }}>{addressData[0].contactNum}</span>
                                    </div>
                                </div>
                                :
                                <div>新增地址</div>
                        }

                    </Item>
                </List>
                <WhiteSpace />
                <List >
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    >{companyName}</Item>
                    <Item
                        style={{ paddingLeft: ".5rem" }}
                    >
                        {
                            selectList.every(item => !item.checked )
                                ?
                                <div style={{color:"#bbb"}} onClick={() => this.props.history.push('/homeServerCompany')}>请选择服务内容</div>
                                :
                                selectList.map((item, index) => {
                                    if (item.checked) {
                                        return <div key={index}>{item.serviceName}</div>
                                    }
                                }
                                )
                        }
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <DatePicker
                        {...getFieldProps('serviceTime', { initialValue: "" })}
                        mode="datetime"
                        title="服务时间"
                        extra="请选择"
                    // value={this.state.serverTime}
                    // onChange={serverTime => this.setState({ serverTime })}
                    >
                        <List.Item arrow="horizontal">服务时间</List.Item>
                    </DatePicker>
                    <TextareaItem
                        {...getFieldProps('orderRemark')}
                        title="订单备注"
                        placeholder="输入备注内容"
                        rows={5}
                        clear
                        count={500}
                    />
                </List>
                <div className={prefix + "_activebtn"}>
                    <Flex style={{ height: "100%" }} align="center" justify="center">
                        <Button
                            onClick={this.saveOrder}
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                                width: "80%",
                                margin: "0 auto",
                                background: "#f83e2f",
                                // marginLeft:".1rem"
                            }}
                        >保存下单</Button>
                    </Flex>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownprops) => {
    return {
        homeCompany: state.serverCompany,
        userinfo: state.userinfo,
        addressData: state.address
    }
}
const mapDispatchToProps = (dispatch, ownprops) => {
    return {
        ADD_address: (address) => dispatch(Address(address))
    }
}
const reduxLogin = withRouter(createForm()(index));
export default connect(mapStateToProps, mapDispatchToProps)(reduxLogin);