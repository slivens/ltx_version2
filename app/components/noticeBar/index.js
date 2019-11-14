import React, { Component } from 'react';
import './style/index.less';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import 'antd/es/row/style';
import 'antd/es/col/style';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import commonUrl from '../../config';
import {connect} from 'react-redux';
import {changeMenu} from '../../redux/actions';
class NoticeBar extends Component{
    componentWillMount(){
       
    }
    fetchMenuData=(item)=>{
        axios.post(`${commonUrl}/app/qryAppMenuList.do`,
        {userId:this.props.userId,
         menuPid:item.id
        }).then(res=>{
            if(res.data.code==='success'){
                if(item.title!=='学习教育'){
                    this.props.fetchMenu(res.data.data);
                }
                this.props.history.push(item.path)

            }
        })
    }
    render(){
        const {data,history}=this.props;
        return(
            <div className="ltx_noticeBar">
                <Row
                type="flex"
                align="middle"
                justify="space-around"
                style={{
                    textAlign: "center",
                    height: "100%"
                }}
                >
                    {
                        data.map((item,index)=>
                            <Col key={index} 
                            onClick={()=>this.fetchMenuData(item)} 
                            span={4}>
                                <div className="ltx_noticeBar_pic">
                                    <img src={item.imgPath}/>
                                </div>
                                <div className="ltx_noticeBar_title">{item.title}</div>
                            </Col>
                            )
                    }
                </Row>
            </div>
        )
    }
}

const mapStateToProps=(state,ownprops)=>({
    userId:state.userinfo.id
})
const mapDispatchToProps=(dispatch,ownprops)=>({
    fetchMenu:(data)=>dispatch(changeMenu(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(NoticeBar))