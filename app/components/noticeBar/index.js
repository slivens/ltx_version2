/*
 * @Author: your name
 * @Date: 2019-09-06 09:42:37
 * @LastEditTime : 2020-01-15 14:06:51
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\components\noticeBar\index.js
 */
import React, { Component } from 'react';
import './style/index.less';
import Row from 'antd/es/row';
import Empty from 'antd/es/empty';
import Col from 'antd/es/col';
import 'antd/es/row/style';
import 'antd/es/col/style';
import 'antd/es/empty/style';
import Skeleton from 'antd/es/skeleton';
import 'antd/es/skeleton/style';
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
        console.log('@@@@data',data)
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
                    {   data.length?
                        data.map((item,index)=>
                            <Col key={index} 
                            style={{marginTop:".08rem"}}
                            onClick={()=>this.fetchMenuData(item)} 
                            span={7}>
                                <div className="ltx_noticeBar_pic">
                                    <img src={item.imgPath}/>
                                </div>
                                <div className="ltx_noticeBar_title">{item.title}</div>
                            </Col>
                            )
                        :<Empty imageStyle={{height:".7rem",marginBottom:".04rem"}} description={localStorage.getItem('username')?"":<span style={{color:"#a7a6a6",fontSize:".16rem"}}>未获得相关权限，请登录！</span>} />
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