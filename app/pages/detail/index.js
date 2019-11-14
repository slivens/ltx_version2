import React, { Component } from 'react';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import { withRouter,Route } from 'react-router-dom';
import Test from './test';
import axios from 'axios';
import commonUrl from '../../config';
    class DetailTop extends Component{
        state={
            findOne:{},
            count:""
        }
        componentWillMount(){
                const detid=this.props.location.pathname.split('/')[2];
                axios.post(`${commonUrl}/app/updateReadingQuantity.do`,{newsId:detid})
                .then(res=>{
                    if(res.data.code==='success'){
                        this.setState({count:res.data.data})
                    }
                })
                axios.post(`${commonUrl}/app/qryNewsDetail.do`,{newsId:detid})
                .then(res=>{
                    if(res.data.code==='success'){
                        this.setState({findOne:res.data.data})
                    }
                    
                })
               
        }
    render() {
        const {history,location} = this.props;
        const {findOne,count}=this.state;
        return (
            <div className="ltx_itemDetail">
                <div className="ltx_itemDetail_topbar">
                    <Icon 
                    onClick={()=>history.goBack()}
                    style={{
                    position: "absolute",
                    left: ".1rem",
                    top: "50%",
                    color: "#F7F8F4",
                    fontSize: ".24rem",
                    transform: "translateY(-50%)"
                }} type="left" />
                <div >详情</div>
                </div>
                <div className="ltx_itemDetail_body">
                    <div className="title">{findOne.title}</div>
                    <div className="date">
                    <span>来源: {findOne.source}</span>&nbsp;&nbsp;<span>{findOne.publicDate}</span>
                    &nbsp;&nbsp;<span>访问量:{findOne.readingQuantity}</span>
                    </div>
                    {/* <div className="pic"><img src={findOne.imgPath}/></div> */}
                    <div className="content" dangerouslySetInnerHTML={{__html:findOne.publicInfo}}></div>
                </div>
            </div>
        )
                }
}
export default withRouter(DetailTop)