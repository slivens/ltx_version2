import React, {Component} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import {withRouter} from 'react-router-dom';
import {Badge} from 'antd-mobile';
import Icon from 'antd/es/icon';
import Empty from 'antd/es/empty';
import 'antd/es/icon/style';
import 'antd/es/empty/style';
import commonUrl from '../../../config/index';
import "./style/index.less";

const prefix = "party";

class PartyList extends Component {
    state = {
        items: [],
        hasMore: true,
        pageNum: "0"
    };
    fetchMoreData = () => {
        this.setState({hasMore: false});
    };
    renderStatus = (type) => {
        switch (type) {
            case "已结束":
                return {
                    background: "#c1c1c1"
                };
            case "进行中":
                return {
                    background: "#ffa30f"
                };
            case "筹备中":
                return {
                    background: "#71a9fe"
                };
            default:
                return {
                    background: "#ffa30f"
                }
        }
    };

    render() {
        const {items} = this.props;
        return (
            <div className={prefix + "_box"}>
                <InfiniteScroll
                    dataLength={items.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={items.length
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
                    {
                        items.map((item, index) => (
                            <div onClick={() => this.props.history.push(`/partyDetail/${item.activityId}`)} key={index}
                                 className={prefix + "_item"}>
                                <div className={prefix + "_item_left"}>
                                    <img
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `${commonUrl}/app/getUploadImg.do?fn=default.jpg`
                                        }}
                                        src={item.imgUrl || `${commonUrl}/app/getUploadImg.do?fn=default.jpg`}
                                    />
                                </div>
                                <div className={prefix + "_item_right"}>
                                    <div className={"title"}>
                                        <Badge text={item.actStatus} style={this.renderStatus(item.actStatus)}/>
                                        <span style={{color: item.actStatus === "已结束" ? "#888" : ""}}
                                              className={"title_content"}>{item.title}</span>
                                    </div>
                                    <div className="date"><Icon type="clock-circle"/>&nbsp;&nbsp;{item.actStartTime}
                                    </div>
                                    <div className="where"><Icon type="environment"/>&nbsp;&nbsp;{item.actAddress}</div>
                                </div>
                            </div>
                        ))
                    }
                </InfiniteScroll>
            </div>
        );
    }
}

export default withRouter(PartyList);