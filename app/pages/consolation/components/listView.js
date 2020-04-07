import React, {Component} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import {Flex} from 'antd-mobile';
import 'antd/es/row/style';
import 'antd/es/col/style';
import "antd/es/empty/style";
import Empty from 'antd/es/empty';
import {withRouter} from 'react-router-dom';
import Icon from '../../../components/icon';
import './style/index.less';


const prefix = "zyListView";

class listView extends Component {
    constructor(props) {
        super(props)
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

    goDetail = (id) => {
        const {detailPath} = this.props;
        this.props.history.push(`/${detailPath}/${id}`);
    };

    returnstr = (content) => {
        return content.replace(/\&nbsp;|\<br\/\>/g, "")
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
                    {this.state.items.map((item, index) => (

                        <div onClick={() => this.goDetail(item.id)} key={index} className={prefix + "_item"}>
                            <div className={prefix + "_item_top"}>
                                <div className={prefix + "_item_top_title"}>
                                    {/*  <Icon
                                     type="my"
                                     onClick={() => history.goBack()}
                                     style={{
                                     position: "absolute",
                                     left: ".1rem",
                                     top: "50%",
                                     color: "#F7F8F4",
                                     fontSize: ".24rem",
                                     transform: "translateY(-50%)"
                                     }} />*/}
                                    <Icon
                                        className="footer_icon"
                                        style={{color: "#71A9FE", fontSize: ".2rem", marginRight: ".05rem",}}
                                        type="wode"/>
                                    <span>{item.name}</span>
                                </div>
                            </div>
                            <div className={prefix + "_item_bottom"}>
                                <Flex>
                                    <Flex.Item>慰问单位：{item.condolencesUnit}</Flex.Item>
                                    <Flex.Item>慰问时间：{item.condolencesTime}</Flex.Item>
                                </Flex>

                               {/* <span className={prefix + "_item_bottom_left"}>慰问单位：{item.condolencesUnit}</span>
                                <span className={prefix + "_item_bottom_right"}>慰问时间：{item.condolencesTime}</span>*/}
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}

export default withRouter(listView);