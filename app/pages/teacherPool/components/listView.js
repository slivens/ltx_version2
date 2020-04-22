import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import classnames from 'classnames';
import {Flex, TextareaItem, List, Badge} from 'antd-mobile';
import Avatar from 'antd/es/avatar';
import Empty from 'antd/es/empty';
import 'antd/es/avatar/style';
import "antd/es/empty/style";


import './style/index.less';
const prefix = "teacherPoolListView";

class listView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.data,
            hasMore: true
        }
    }

    componentWillReceiveProps(nextprops) {
        this.setState({items: nextprops.data})
    }

    fetchMoreData = () => {
        this.setState({hasMore: false});
    };

    goDetail = (id) => {
    };

    render() {
        return (
            <div style={{...this.props.style}} className={prefix}>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={this.state.items.length
                        ? <h4 style={{fontSize: ".14rem", textAlign: 'center'}}>加载中...</h4>
                        : <Empty description={"暂无数据"}/>
                    }
                    height={"100%"}
                    endMessage={
                        <p style={{fontSize: ".14rem", textAlign: "center"}}>
                            <b>数据已加载完毕</b>
                        </p>
                    }
                >
                    {/*  <List className="my-list">
                     {
                     this.state.items.map((item, index) =>
                     <List.Item key={index}>
                     <Avatar size={48} icon="user"/>
                     &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
                     <TextareaItem value={item.des}/>
                     </List.Item>
                     )}

                     </List>*/}
                    {this.state.items.map((item, index) => (
                        <div onClick={() => this.godetail(item.id)} key={index} className={prefix + "_item"}>
                            <div className={prefix + "_item_avatar"}>
                                <Avatar size={60} icon="user"/>
                            </div>
                            <div className={prefix + "_item_right"}>
                                <div className={prefix + "_item_right_title"}>
                                    <span >{item.name}</span>
                                    <Badge text={item.mark} />
                                    {/*<div dangerouslySetInnerHTML={{__html:item.abstractInfo}} className="content"/>*/}
                                </div>
                                <div
                                    className={prefix + "_item_right_des"}>{/*className="homeListView_item_right-bottom"*/}
                                    {item.des}
                                </div>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}

export default withRouter(listView);