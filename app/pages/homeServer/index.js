import React, { Component } from 'react';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import ConmonCard from './conmonCard';
import axios from 'axios';
import commonUrl from '../../config';
 import {connect} from 'react-redux';
 import {AddHomeServer} from '../../redux/actions';
class index extends Component {
    state={
        jzfwData:[]
    }
    gowhere = (path) => {
        this.props.history.push(path)
    }
    componentWillMount(){
      
        axios.post(`${commonUrl}/app/homeService/getCompanyList.do`, {})
        .then(res=>{
            if(res.data.code==='success'){
                this.setState({jzfwData:res.data.data})
            }
        })
    }
    homeServerFunc=(item)=>{
         this.props.addHomeServer(item,
            ()=>this.props.history.push('/homeServerCompany')
            )
    }
    render() {

        return (
            <div className="homeServer">
                <div className="homeServer_topbar">
                    <Icon
                        onClick={() => this.props.history.goBack()}
                        style={{
                            position: "absolute",
                            left: ".1rem",
                            top: "50%",
                            color: "#F7F8F4",
                            fontSize: ".24rem",
                            transform: "translateY(-50%)"
                        }} type="left" />
                    家政服务</div>
                <div className="homeServer_entry">
                    {
                        this.state.jzfwData.map((item, index) =>
                            <ConmonCard
                                key={item.id||index}
                                item={item}
                                onClick={()=>this.homeServerFunc(item)}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state,ownprops)=>{
    return {
        homeCompany:state.serverCompany,
        userinfo:state.userinfo
    }
}
const mapDispatchToProps=(dispatch,ownprops)=>{
    return {
        addHomeServer:(company,func)=>{
            dispatch(AddHomeServer(company))
            func()
        }
    }
}
const reduxComp=connect(mapStateToProps,mapDispatchToProps)(index);
export default withRouter(reduxComp);