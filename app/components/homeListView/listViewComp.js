/*
 * @Author: Sliven
 * @Date: 2020-04-19 20:44:58
 * @LastEditTime: 2020-04-24 11:10:36
 * @LastEditors: Sliven
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\components\homeListView\listViewComp.js
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh, ListView, Button, Icon } from 'antd-mobile';
import Axios from 'axios';
import Skeleton from 'antd/es/skeleton';
import "antd/es/skeleton/style";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const NUM_ROWS = 10; //显示条数
let pageIndex = 1;  //页码
let dataBlobs = []; //数据模型
const skeletonCount=10 //预显示骨架数

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
      useBodyScroll: props.useBodyScroll,
      SkeletonLoading: false,
      columnCode: props.columnCode,
      fech_url: props.url
    };
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    if (nextProps.columnCode !== this.props.columnCode) {
      console.log('@@@@@@@@componentWillReceiveProps')
      this.setState({ SkeletonLoading: true, columnCode: nextProps.columnCode }, () => {
        this.onRefresh()
      })
    }
  }
  componentWillUnmount(){
    dataBlobs=[]
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
  fetchData = (pIndex = 1) => {
    const {columnCode} =this.state;
    const { params } = this.props;
    Axios.post(this.state.fech_url, {
      ...params,
      columnCode: columnCode||undefined,
      pageSize: NUM_ROWS,
      pageNumber: pIndex
    })
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
  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.setState({ height: hei})
    this.fetchData();
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
  godetail = (id) => {
    this.props.history.push(`/detail/${id}`)
  }
  render() {
    const { row } = this.props;
    // const getRowCount = this.state.dataSource.getRowCount()||NUM_ROWS;
    console.log('@@@@@@@@@this.state.dataSource',this.state.dataSource)
    const skeletonData = Array(skeletonCount).fill(< Skeleton active />)
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
                // border: '1px solid #ddd',
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
ListViewComp.defaultProps = {
  columnCode: '',
  useBodyScroll:false
};
ListViewComp.propTypes = {
  url: PropTypes.string.isRequired,
  columnCode: PropTypes.string,
  row: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  useBodyScroll:PropTypes.bool

}
export default withRouter(ListViewComp);
