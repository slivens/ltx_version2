/*
 * @Author: your name
 * @Date: 2019-09-19 10:36:55
 * @LastEditTime: 2020-04-29 13:21:59
 * @LastEditors: Sliven
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\mybranch\zbactive\index.js
 */
import React, { Component } from 'react';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import 'antd/es/empty/style';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import commonUrl from '../../../config/index';
import { connect } from 'react-redux';
import { Toast, Badge, ListView,Tabs } from 'antd-mobile';
import noAuth from '../../../util/noAuth';
import {EditActive} from '../../../redux/actions';
import ListViewComp from '../../../components/homeListView/listViewComp2';
let CancelToken = axios.CancelToken;
const tabs = [
  { title: '全部活动', key: 't1' },
  { title: '我参与的', key: 't2' },
  { title: '我发布的', key: 't3' },
];
let dataBlobs = []; //数据模型
const NUM_ROWS = 10;
let pageIndex = 1;  //页码
const dataSource = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});
class zbactive extends Component {
  state = {
    items: [],
    tab: tabs[0],
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
    this.setState({ SkeletonLoading: true, tab: tab }
      , () => {
        this.fetchData(undefined, cancelToken)
      });
    localStorage.setItem("branch_tab", JSON.stringify(tab));
  }

  renderDataBlobs = (data) => {
    dataBlobs = dataBlobs.concat(data)
  }
  componentWillMount() {
    if (localStorage.getItem("branch_tab")) {
      dataBlobs = [];
      pageIndex = 1;
      const tab = JSON.parse(localStorage.getItem("branch_tab"));
      this.setState({ tab: tab }, () => { this.fetchData() });
    } else {
 
      this.fetchData()
    }
  }
  renderStatus = (type) => {
    switch (type) {
      case "已结束":
        return {
          background: "#c1c1c1"
        }
      case "进行中":
        return {
          background: "#ffa30f"
        }
      case "筹备中":
        return {
          background: "#71a9fe"
        }

      default:
        return {
          background: "#ffa30f"
        }
    }
  }

  componentWillUnmount() {
    dataBlobs = []
    pageIndex = 1
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

  fetchData = (pIndex = 1, cancelToken) => {
    let obj = {};
    const { tab } = this.state;
    if (tab && tab.title === '我参与的') {
      obj.userId = this.props.userid;
    }
    if (tab && tab.title === '我发布的') {
      obj.operUserId = this.props.userid;
    }
    this.setState({ hasMore: true })
    axios.post(`${commonUrl}/app/activity/findActPageList.do`, {
      ...obj,
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

  godetail = (item) => {
     this.props.history.push(`/zbdetail/${item.activityId}`)
  }
  row = (item, sectionID, rowID) => {
    return (
      <div onClick={()=>{this.godetail(item)}} key={rowID} className="zbactive_item">
        <div className="zbactive_item_left">
          <img
            onError={(e) => { e.target.onerror = null; e.target.src = `${commonUrl}/app/getUploadImg.do?fn=default.jpg` }}
            src={item.imgUrl || `${commonUrl}/app/getUploadImg.do?fn=default.jpg`}
          />
        </div>
        <div className="zbactive_item_right">
          <div className="title">
            <Badge text={item.actStatus} style={this.renderStatus(item.actStatus)} />
            <span style={{ color: item.actStatus === "已结束" ? "#888" : "" }} className="title_content">{item.title}</span>
          </div>
          <div className="date"><Icon type="clock-circle" />&nbsp;&nbsp;{item.actStartTime}</div>
          <div className="where"><Icon type="environment" />&nbsp;&nbsp;{item.actAddress}</div>
        </div>
      </div>
    );
  };
  pushActivity=()=>{
    if(this.props.partyBranchId){
      this.props.editActive();
      this.props.history.push('/pushActivity') 
    }else{
      Toast.info('未获得发布权限，请联系管理员！')
    }
  }
  render() {
    return (
      <div className="zbactive">
        <div className="zbactive_topbar">
          <Icon
            onClick={() => this.props.history.goBack()}
            style={{
              position: "absolute",
              left: ".1rem",
              top: "50%",
              color: "#F7F8F4",
              fontSize: ".24rem",
              transform: "translateY(-50%)"
            }}
            type="left"
          />
                    支部活动
                    <Icon
            type="menu"
            style={{
              position: "absolute",
              right: ".1rem",
              top: "50%",
              color: "#F7F8F4",
              fontSize: ".18rem",
              transform: "translateY(-50%)"
            }}
            onClick={this.pushActivity}
          />
        </div>
        <div className="zbactive-box">
          {/* <Zbtj tabonChange={this.tabsOnchange} /> */}
          <Tabs tabs={tabs}
            page={this.state.tab.key}
            initialPage={"tab1"}
            tabBarUnderlineStyle={{ borderColor: "#F83A2E" }}
            tabBarActiveTextColor={"#F83A2E"}
            onChange={this.tabsOnchange}
          // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
          </Tabs>
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  userid: state.userinfo.id,
  partyBranchId: state.userinfo.partyBranchId
})
const mapdispatchToProps = (dispatch, ownProps) => {
  return {
    editActive: () => {
      dispatch(EditActive({}))
    }
  }
}
export default connect(mapStateToProps, mapdispatchToProps)(withRouter(zbactive));