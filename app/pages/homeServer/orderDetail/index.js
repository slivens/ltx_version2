import React, { Component } from 'react';
import { List, Checkbox, Flex, WhiteSpace, TextareaItem, Button, Badge, DatePicker } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import "./style/index.less";
import Axios from 'axios';
import commonUrl from '../../../config';
const prefix = "orderdetail"
import { connect } from 'react-redux';
import OrderItem from '../../../components/orderList';
import noAuth from '../../../util/noAuth';
const Item = List.Item;
const Brief = Item.Brief;
class index extends Component {
    state = {
        orderListData: {}
    }
    componentWillMount() {
        const { location } = this.props.history;
        const orderId = location.pathname.split('/')[2]

        Axios.post(`${commonUrl}/app/homeService/getOrderDetail.do`, { userId: this.props.userinfo.id, orderId })
            .then(res => {
                if (res.data.code === 'success') {
                    this.setState({ orderListData: res.data.data })
                }
                noAuth.noAuthCode(res.data)
            })
    }
    render() {
        const { orderListData } = this.state;
        console.log(orderListData)
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
                    订单详情
                </div>
                <WhiteSpace />
                <List >
                    <Item
                        thumb={orderListData.companyLogo}
                    >{orderListData.companyName}</Item>
                    <Item
                        style={{ paddingLeft: ".5rem" }}
                    >
                        {orderListData.services&&orderListData.services.map((item, index) => {
                            return (
                                <div key={index}>{Object.keys(item)[0]}</div>
                            )
                        }
                        )}
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <OrderItem title={"联系人"} content={orderListData.contactPerson} />
                    <OrderItem title={"联系电话"} content={orderListData.contactNum} />
                    <OrderItem title={"服务地址"} content={orderListData.detailAddress} />
                    <OrderItem title={"服务时间"} content={orderListData.serviceTime} />

                </List>
                <WhiteSpace />
                <List>
                    <OrderItem title={"订单备注"} content={orderListData.orderRemark} />
                    <OrderItem title={"订单号"} content={orderListData.orderNum} />
                    <OrderItem title={"下单时间"} content={orderListData.orderTime} />
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state, ownprops) => {
    return {
        homeCompany: state.serverCompany,
        userinfo: state.userinfo
    }
}
const reduxComp = connect(mapStateToProps, null)(index);
export default withRouter(reduxComp);
