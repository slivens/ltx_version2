import React, { Component } from 'react';
import { List, Checkbox, Flex, WhiteSpace,TextareaItem,Button} from 'antd-mobile';
import Icon from 'antd/es/icon';
import {withRouter} from "react-router-dom";
import 'antd/es/icon/style';
import "./style/index.less";
import Skeleton from 'antd/es/skeleton';
import 'antd/es/skeleton/style';
const prefix = "jintaiyang";
import { connect } from 'react-redux';
const CheckboxItem = Checkbox.CheckboxItem;
import Axios from 'axios';
import commonUrl from '../../../config';
import {SelectHomeServer} from '../../../redux/actions';
const Item = List.Item;
const Brief = Item.Brief;
class index extends Component {
    state={
        serverList:[]
    }
    selectList=[]
    componentWillMount(){
        const {homeCompany}=this.props;
        Axios.post(`${commonUrl}/app/homeService/getServiceList.do`, {companyId:homeCompany.id})
        .then(res=>{
            if(res.data.code==='success'){
                const {selectList}=this.props.homeCompany;
                this.setState({serverList:res.data.data})
                if (!selectList) this.props.changeSelect(res.data.data)
            }
        })
    }
    componentWillReceiveProps(){

    }
    checkBoxChange=(e,selectItem)=>{
        const {selectList}=this.props.homeCompany
        const selectChecked=selectList.filter((item,index)=>item.id===selectItem.id)
        if(!selectChecked.length){
            // this.selectList.push({...selectItem,checked:e.target.checked})
            return 
        }else{
            selectChecked[0].checked=e.target.checked
            const newArr=selectList.map((item,index)=>{
                if(item.id===selectItem.id){
                    return item=selectChecked[0]
                }else return item  
            })
            this.props.changeSelect(newArr)
        }
    }
    render() {
        const {history,location,homeCompany}=this.props;
        const {selectList}=this.props.homeCompany;
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
                    {homeCompany.companyName}
                </div>
                <div className={prefix + "_box"}>
                    <div className={prefix + "_pic"}>
                        <img src={`http://192.168.111.132:8080/app/getUploadImg.do?fn=default.jpg`}
                        />
                    </div>
                    <WhiteSpace />
                    <List>
                    {
                        selectList?
                        selectList.map((item,index)=>
                        <Item
                            extra={<Checkbox checked={item.checked}  onChange={(e)=>this.checkBoxChange(e,item)}/>}
                            thumb="http://192.168.111.132:8080/app/getUploadImg.do?fn=default.jpg"
                            multipleLine
                        >
                            {item.serviceName} <div style={{color:"#888",fontSize:".15rem"}}>{item.serviceDescription}</div>
                        </Item>
                        )
                        :<Skeleton active/>
                    }
                    </List>
                    <WhiteSpace />
                    <List>
                    <TextareaItem
                    title="其他"
                    placeholder="若有其他相关家政服务需求，建议提前和家政公司商定后，在此处填写。"
                    rows={5}
                    clear
                  />
                    </List>
                    <WhiteSpace />
                    <div className={prefix + "_activebtn"}>
                    <Flex style={{ height: "100%" }} align="center" justify="center">
                        <Button
                            onClick={()=>this.props.history.push('/yuyue')}
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                                width: "80%",
                                margin: "0 auto",
                                background: "#f83e2f",
                                // marginLeft:".1rem"
                            }}      
                        >确认</Button>
                    </Flex>
                </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state,ownprops)=>{
    return {
        homeCompany:state.serverCompany
    }
}
const mapDispatchToProps=(dispatch,ownprops)=>{
    return {
        changeSelect:(select)=>dispatch(SelectHomeServer(select)) 

    }
}
const reduxComp=connect(mapStateToProps,mapDispatchToProps)(index);

export default withRouter(reduxComp);