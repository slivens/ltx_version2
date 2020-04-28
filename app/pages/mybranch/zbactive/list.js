/*
 * @Author: your name
 * @Date: 2019-09-19 14:13:41
 * @LastEditTime: 2020-02-25 10:11:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\mybranch\zbactive\list.js
 */
import React, { Component } from 'react';
import {Badge} from 'antd-mobile';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import Empty from 'antd/es/empty';
import 'antd/es/empty/style';
import InfiniteScroll from "react-infinite-scroll-component";
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import commonUrl from '../../../config/index';
class list extends Component {
    state = {
        items: [],
        hasMore: true,
        pageNum:"0"
    }
    fetchMoreData = () => {
        this.setState({ hasMore: false });
    };
    renderStatus=(type)=>{
        switch (type) {
            case "已结束":
                return {
                    background:"#c1c1c1"
                }
            case "进行中":
                return {
                    background:"#ffa30f"
                }
            case "筹备中":
                return {
                    background:"#71a9fe"
                }
        
            default:
                return {
                    background:"#ffa30f"
                }
        }
    }
    render() {
        const {items} = this.props;
        console.log('@@@@@@@123123123131',items)
        return (
            <div className="zbactive_box">
            <InfiniteScroll
                dataLength={items.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={items.length
                    ?<h4 style={{fontSize:".14rem",textAlign:'center'}}>加载中...</h4>
                    :<Empty description={"暂无数据"}/>
                }
                height={"100%"}
                endMessage={items.length?
                    <p style={{fontSize:".14rem",textAlign: "center" }}>
                        <b>数据已加载完毕</b>
                    </p>
                    :<Empty description={"暂无数据"}/>
                }
            >    
            {
                items.map((item, index) => (
               <div onClick={()=>this.props.history.push(`/zbdetail/${item.activityId}`)} key={index} className="zbactive_item">
               <div className="zbactive_item_left">
               <img
                onError={(e) => {e.target.onerror = null;e.target.src=`${commonUrl}/app/getUploadImg.do?fn=default.jpg`}}
                 src={item.imgUrl||`${commonUrl}/app/getUploadImg.do?fn=default.jpg`}
                 />
               </div>
               <div className="zbactive_item_right">
                   <div className="title">
                   <Badge text={item.actStatus} style={this.renderStatus(item.actStatus)}/>
                   <span style={{color:item.actStatus==="已结束"?"#888":""}} className="title_content">{item.title}</span>
                   </div>
                   <div className="date"><Icon type="clock-circle" />&nbsp;&nbsp;{item.actStartTime}</div> 
                   <div className="where"><Icon type="environment" />&nbsp;&nbsp;{item.actAddress}</div> 
               </div>
           </div>
          ))
        }
            </InfiniteScroll>
            </div>
        );
    }
}

export default withRouter(list);
