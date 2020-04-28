/*
 * @Author: Sliven
 * @Date: 2020-04-23 14:48:51
 * @LastEditors: Sliven
 * @LastEditTime: 2020-04-28 09:49:10
 * @Description: the code is written by Sliven
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import { connect } from 'react-redux';
import axios from 'axios';
import commonUrl from '../../config';
import { Tabs, WhiteSpace, Badge, Modal,ListView } from 'antd-mobile';
import { GGWTabs } from '../../redux/actions';
import ListViewComp from '../../components/homeListView/listViewComp2';
import classnames from 'classnames';
let CancelToken = axios.CancelToken;
let dataBlobs = []; //数据模型
const NUM_ROWS = 10;
let pageIndex = 1;  //页码
const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});
class ggwView extends Component {
    state = {
        nowtabs: {},
        tabsArr: [],
        dataSource,
        hasMore: true,
        refreshing: true,   //pulldown
        isLoading: true,
        SkeletonLoading: false, //骨架
    }
    tabsOnchange = (tab, index) => {
        dataBlobs = [];
        pageIndex = 1;
        let _this = this;
        this.fetchCancel ? this.fetchCancel() : console.log('not cancel');
        let cancelToken = {
          cancelToken: new CancelToken((c) => {
            _this.fetchCancel = c
          })
        }
        this.setState({ SkeletonLoading: true, nowtabs: tab }
          , () => {
            this.fetchData(undefined, cancelToken)
          });
        localStorage.setItem("ggwTab", JSON.stringify(tab));
      }

    renderTabs = (arr) => {
        return arr.map(item => ({
            title: item.noticeColumn,
            key: item.noticeCode
        }))
    }
    renderDataBlobs = (data) => {
        dataBlobs = dataBlobs.concat(data)
      }
      componentWillUnmount(){
        dataBlobs = []
        pageIndex = 1
      }
    fetchData = (pIndex = 1, cancelToken) => {
        this.setState({ hasMore: true })
        axios.post(`${commonUrl}/app/qryNewsPageListByCode.do`, {
            columnCode: this.state.nowtabs.key,
          pageSize: NUM_ROWS,
          pageNumber: pIndex
        }, {
          cancelToken: cancelToken ? cancelToken.cancelToken : undefined //拦截
        })
          .then(res => {
            if (res.data.code === 'success') {
              if (!res.data.data.result.length) {
                this.setState({ hasMore: false })
              }
              this.renderDataBlobs(res.data.data.result)
              this.setState({
                refreshing: false,
                isLoading: false,
                SkeletonLoading: false,
                dataSource: this.state.dataSource.cloneWithRows(dataBlobs),
              })
            }
          })
      }
      /**
   * @description: 下拉刷新函数，手势下拉，整体列表刷新。
   * @param {type} 
   * @return: 
   */
  onRefresh = () => {
    dataBlobs = []
    pageIndex = 1
    this.setState({ hasMore: true, refreshing: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.fetchData();
    }, 600)
  };
  /**
   * @description: 列表拉到底部进行刷新
   * @param {type} 
   * @return: 
   */
  onEndReached = (event) => {
    this.setState({ isLoading: true });
    if (!this.state.hasMore) {
      return this.setState({ isLoading: false });
    }
    this.fetchData(++pageIndex)
  };
    componentWillMount() {
        const { ggwTasbs } = this.props;
        axios.post(`${commonUrl}/app/menu/qryAppTabList.do`, { columnCode: ggwTasbs.code })
            .then(res => {
                if (res.data.code === 'success') {
                    let nowtabs;
                    const tabs = this.renderTabs(res.data.data);
                    this.props.GGWTabs({ tabs: tabs })
                    if (localStorage.getItem("ggwTab")) {
                        dataBlobs = [];
                        pageIndex = 1;
                        const tab = JSON.parse(localStorage.getItem("ggwTab"));
                        const judge = tabs.find(item => item.key === tab.key)
                        if (judge) {
                            nowtabs = tab
                        } else {
                            nowtabs = tabs[0]
                        }
                    } else {
                        nowtabs = tabs[0]
                    }
                    this.setState({ tabsArr: tabs, nowtabs: nowtabs },()=>{this.fetchData()})
                }
            })


    }
    godetail = (id) => {
        this.props.history.push(`/detail/${id}`)
    }
    row = (item, sectionID, rowID) => {
        return (
            <div onClick={() => this.godetail(item.id)} key={rowID} className="homeListView_item">
                <div className={classnames("homeListView_item_right", item.imgPath ? "" : "noimg")}>
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
                    item.imgPath &&
                    <div className="homeListView_item_pic">
                        <div style={{ height: "100%", width: "100%" }} className="pic">
                            <img onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `${commonUrl}/app/getUploadImg.do?fn=default.jpg`
                            }}
                                src={item.imgPath} />
                        </div>
                    </div>
                }
            </div>
        );
    };
    render() {
        const { ggwTasbs } = this.props;
        const listViewParams = {}
        return (
            <div>
                <div className="ggw">
                    <div className="ggw_topbar">
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
                        {ggwTasbs.title}</div>
                    <div className="ggw_entry">
                        <Tabs tabs={this.state.tabsArr}
                            page={this.state.nowtabs.key}
                            initialPage={"tab1"}
                            tabBarUnderlineStyle={{ borderColor: "#F83A2E" }}
                            tabBarActiveTextColor={"#F83A2E"}
                            onChange={this.tabsOnchange}
                        >
                        </Tabs>
                        {
                            this.state.nowtabs.key &&
                            <ListViewComp
                            refreshing={this.state.refreshing}
                            isLoading={this.state.isLoading}
                            SkeletonLoading={this.state.SkeletonLoading}
                            row={this.row}
                            hasMore={this.state.hasMore}
                            dataSource={this.state.dataSource}
                            onRefresh={this.onRefresh}
                            onEndReached={this.onEndReached}
                          />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    ggwTasbs: state.ggwTasbs
})
const mapdispatchToProps = (dispatch, ownProps) => {
    return {
        GGWTabs: (tabs) => {
            dispatch(GGWTabs(tabs))
        },

    }
}

export default connect(mapStateToProps, mapdispatchToProps)(withRouter(ggwView));

