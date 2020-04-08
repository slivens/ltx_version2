import React, { Component } from 'react';
import { List, Checkbox, Flex, WhiteSpace, TextareaItem, Button, Badge, DatePicker } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import "./style/index.less";
import OrderItem from '../../../components/orderList';
import { connect } from 'react-redux';
import Axios from 'axios';
import commonUrl from '../../../config';
import noAuth from '../../../util/noAuth';
const prefix = "myorder"
const Item = List.Item;
const Brief = Item.Brief;
class index extends Component {
    state={
        orderListData:[]
    }
    componentWillMount(){
      
        Axios.post(`${commonUrl}/app/homeService/getMyOrderList.do`, {userId:this.props.userinfo.id})
        .then(res=>{
            if(res.data.code==='success'){
                this.setState({orderListData:res.data.data})
            }
            noAuth(res.data,()=>this.props.history.push('/login'))
        })
    }
    render() {
        const {orderListData}=this.state;
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
                    我的订单
                </div>
                        <div className={prefix + "_box"}> 
                        
                        {
                            orderListData&&orderListData.map((item,index)=>
                            <div>
                            <WhiteSpace />
                            <List key={index} className="orderList" onClick={()=>this.props.history.push(`/orderDetail/${item.orderId}`)}>
                            <Item
                                arrow="horizontal"
                                thumb={item.companyLogo}
                            >{item.companyName}</Item>
                            <OrderItem title={"服务项目"} content={item.serviceNames}/>
                            <OrderItem title={"服务时间"} content={item.serviceTime}/>
                            <OrderItem title={"服务地址"} content={item.serviceAddress}/>
                            <OrderItem title={"联系人"} content={item.contactPerson}/>
                            <OrderItem title={"联系电话"} content={item.contactNum}/>
                            </List>
                            </div>
                            )
                        }  
                        </div>
                </div>
        );
    }
}
const mapStateToProps = (state, ownprops) => {
    return {
        userinfo: state.userinfo,
        addressData:state.address
    }
}
const reduxLogin = withRouter(index);
export default connect(mapStateToProps, null)(reduxLogin);
