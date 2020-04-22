/*
 * @Author: your name
 * @Date: 2019-09-19 10:36:55
 * @LastEditTime: 2020-04-22 11:48:55
 * @LastEditors: Sliven
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\mybranch\zbactive\index.js
 */
import React, { Component } from 'react';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import Zbtj from './zbtj';
import 'antd/es/empty/style';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import commonUrl from '../../../config/index';
import { connect } from 'react-redux';
import { Toast, Badge } from 'antd-mobile';
import noAuth from '../../../util/noAuth';
const test = "http://192.168.111.132:8080";
import ListView from '../../../components/homeListView/listViewComp';
class zbactive extends Component {
  state = {
    items: [],
    tab: {}
  }
  tabonChange = (tab) => {
    this.setState({ tab: tab }, () => {
      this.fetchdata(tab)
    })
  }
  componentWillMount() {
    let tab = localStorage.getItem('branch_tab')
    if (tab) {
      this.setState({ tab: JSON.parse(tab) })
      this.fetchdata(JSON.parse(tab));
    } else {
      this.fetchdata()
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
  fetchdata = (tab) => {
    let obj = {};
    if (tab && tab.title === '我参与的') {
      obj.userId = this.props.userid;
    }
    if (tab && tab.title === '我发布的') {
      obj.operUserId = this.props.userid;
    }
    axios.post(`${commonUrl}/app/activity/findActPageList.do`, obj
    )
      .then(res => {
        noAuth(res.data, () => this.props.history.push('/login'))
        if (res.data.code === "success") {
          this.setState({ items: res.data.data.result })
        } else {
        }
      })
  }
  godetail = (id) => {
    this.props.history.push(`/detail/${id}`)
  }
  row = (item, sectionID, rowID) => {
    return (
      <div onClick={() => this.props.history.push(`/zbdetail/${item.activityId}`)} key={rowID} className="zbactive_item">
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
  render() {
    const { tab } = this.state;
    let params = {};
    if (tab && tab.title === '我参与的') {
      params.userId = this.props.userid;
    }
    if (tab && tab.title === '我发布的') {
      params.operUserId = this.props.userid;
    }
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
            onClick={() => this.props.partyBranchId ? this.props.history.push('/pushActivity') : Toast.info('未获得发布权限，请联系管理员！')}
          />
        </div>
        <div className="zbactive-box">
          <Zbtj tabonChange={this.tabonChange} />
          <ListView
            params={params}
            url={`${commonUrl}/app/activity/findActPageList.do`}
            columnCode={tab.key}
            row={this.row}

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
  }
}
export default connect(mapStateToProps, mapdispatchToProps)(withRouter(zbactive));