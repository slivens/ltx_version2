import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh, ListView, Button, Icon } from 'antd-mobile';
import Axios from 'axios';
import commonUrl from '../../config';
import classnames from 'classnames';
import Skeleton from 'antd/es/skeleton';
import "antd/es/skeleton/style";
import {withRouter} from 'react-router-dom';
// import './style/index.less';
import PropTypes from 'prop-types';
const NUM_ROWS = 5; //显示条数
let pageIndex = 1;  //页码
let dataBlobs = []; //数据模型
const skeletonCount=10

class ListViewComp extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      hasMore: true,
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: true,
      SkeletonLoading: false,
      columnCode: props.columnCode
    };
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    if (nextProps.columnCode !== this.props.columnCode) {
      this.setState({ SkeletonLoading: true, columnCode: nextProps.columnCode }, () => {
        this.onRefresh()
      })
    }
  }

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
  renderDataBlobs = (data) => {
    dataBlobs = dataBlobs.concat(data)
  }
  fetchData = (columnCode = "workNews", pIndex = 1) => {
    Axios.post(`${commonUrl}/app/qryNewsPageListByCode.do`, { columnCode: columnCode, pageSize: NUM_ROWS, pageNumber: pIndex })
      .then(res => {
        if (res.data.code === 'success') {
          this.renderDataBlobs(res.data.data.result)
          if (!res.data.data.result.length) {
            this.setState({ hasMore: false })
          }
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(dataBlobs),
            refreshing: false,
            isLoading: false,
            SkeletonLoading: false,
          });
        }
      })
  }
  componentWillUnmount(){
    console.log('@@@@componentWillUnmount')
    dataBlobs=[]
  }
  componentDidMount() {
    console.log('@@@@didmount')
    const { columnCode } = this.state;
    this.fetchData(columnCode);
  }
  /**
   * @description: 下拉刷新函数，手势下拉，整体列表刷新。
   * @param {type} 
   * @return: 
   */
  onRefresh = () => {
    console.log('@@@@onRefresh')
    const { columnCode } = this.state;
    dataBlobs = []
    pageIndex = 1
    this.setState({ hasMore: true, refreshing: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.fetchData(columnCode);
    }, 600)
  };
  /**
   * @description: 列表拉到底部进行刷新
   * @param {type} 
   * @return: 
   */
  onEndReached = (event) => {
    console.log('@@@@onEndReached')
    this.setState({ isLoading: true });
    if (!this.state.hasMore) {
      return this.setState({ isLoading: false });
    }
    const { columnCode } = this.state;
    this.fetchData(columnCode, ++pageIndex)
  };
  godetail=(id)=>{
    this.props.history.push(`/detail/${id}`)
}
  render() {
    console.log('@@@this.state.dataSource',this.state.dataSource)
    const skeletonData = Array(skeletonCount).fill(< Skeleton active />)
    const row = (item, sectionID, rowID) => {
      return (
        <div onClick={()=>this.godetail(item.id)} key={rowID} className="homeListView_item">
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
    return (
      <div>
        {
          !this.state.SkeletonLoading ?
            <ListView
              key={this.state.useBodyScroll ? '0' : '1'}
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
              renderFooter={() => (<div style={{ padding: 5, textAlign: 'center' }}>
                {this.state.isLoading ? <Icon type={'loading'} /> : '数据已经加载完啦~'}
              </div>)}
              renderRow={row}
              useBodyScroll={this.state.useBodyScroll}
              style={this.state.useBodyScroll ? {} : {
                height: this.state.height,
                border: '1px solid #ddd',
                margin: '5px 0',
              }}
              pullToRefresh={<PullToRefresh
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={50}
              pageSize={5}
            />
            : <div>{skeletonData}</div>
        }</div>
    );
  }
}
ListViewComp.propTypes={
  
}
export default withRouter(ListViewComp);