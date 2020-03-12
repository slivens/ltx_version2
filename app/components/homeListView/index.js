/*
 * @Author: your name
 * @Date: 2019-09-03 16:31:48
 * @LastEditTime: 2020-02-21 10:05:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\components\homeListView\index.js
 */
import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import './style/index.less';
import 'antd/es/row/style';
import 'antd/es/col/style';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import commonUrl from '../../config';
import Empty from 'antd/es/empty';
import "antd/es/empty/style";
// const dataSource=[
// {
//     title:'省领导走访看望老同志',
//     content:"访看望老同志省领导走访看望老同志访看望老同志",
// }
// ]
class index extends Component {
    constructor(props){
        super(props)
        this.state = {
            items:props.data,
            hasMore: true
        }
    }
    componentWillReceiveProps(nextprops){
        this.setState({items:nextprops.data})
    }
    fetchMoreData = () => {
        this.setState({ hasMore: false });
        // if (this.state.items.length >= 40) {
        //     this.setState({ hasMore: false });
        //     return;
        // }
        // setTimeout(() => {
        //     this.setState({
        //         items: this.state.items.concat(dataSource)
        //     });
        // }, 500);
    };
    godetail=(id)=>{
        this.props.history.push(`/detail/${id}`)
    }
    returnstr=(content)=>{
         return content.replace(/\&nbsp;|\<br\/\>/g,"")
    }
    render() {
        return (
            <div style={{...this.props.style}} className="homeListView">
            <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={this.state.items.length
                ?<h4 style={{fontSize:".14rem",textAlign:'center'}}>加载中...</h4>
                :<Empty description={"暂无数据"}/>
            }
                height={"100%"}
                endMessage={
                    <p style={{fontSize:".14rem",textAlign: "center" }}>
                        <b>数据已加载完毕</b>
                    </p>
                }
            >    
            {this.state.items.map((item, index) => (
                <div onClick={()=>this.godetail(item.id)} key ={index} className="homeListView_item">
                    <div className={classnames("homeListView_item_right",item.imgPath?"":"noimg")}>
                        <div className="homeListView_item_right-top">
                        <div className="title">{item.title}</div>
                        {/*<div dangerouslySetInnerHTML={{__html:item.abstractInfo}} className="content"/>*/}
                        </div>
                        <div className="homeListView_item_right-bottom">
                            <span className="source">{item.source}</span>
                            <span className={"count"}>{item.publicDate}</span>
                            {/* <span className="date">2019-01-18</span> */}
                            {/* <span className="count">1002&nbsp;阅读</span> */}
                        </div>
                    </div>
                    {
                        item.imgPath&&
                    <div className="homeListView_item_pic"> 
                     <div style={{height:"100%",width:"100%"}} className="pic"><img onError={(e) => {e.target.onerror = null;e.target.src=`${commonUrl}/app/getUploadImg.do?fn=default.jpg`}}  src={item.imgPath}/></div>
                    </div>
                    }
                </div>
          ))}
            </InfiniteScroll>
            </div>
        );
    }
}

export default withRouter(index);