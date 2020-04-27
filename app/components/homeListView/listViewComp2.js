/*
 * @Author: Sliven
 * @Date: 2020-04-19 20:44:58
 * @LastEditTime: 2020-04-27 14:13:05
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
    this.state = {
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: props.useBodyScroll,
      SkeletonLoading: false,
    };
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    // if (nextProps.dataSource !== this.props.dataSource) {
    //   console.log('@@@@@@@@componentWillReceiveProps')
    //   nextProps.fetchData();
    // }
  }
  componentWillUnmount(){
    // dataBlobs=[]
  }
  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
  
  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.setState({ height: hei})
  }
  
  render() {
    const { row,dataSource,refreshing,isLoading,SkeletonLoading } = this.props;
    // const getRowCount = this.state.dataSource.getRowCount()||NUM_ROWS;
    console.log('@@@@@@@@@this.state.dataSource',dataSource)
    const skeletonData = Array(skeletonCount).fill(< Skeleton active />)
    return (
      <div>
        {
          !SkeletonLoading ?
            <ListView
              key={this.state.useBodyScroll ? '0' : '1'}
              ref={el => this.lv = el}
              dataSource={dataSource}
              renderFooter={() => (<div style={{ padding: 5, textAlign: 'center' }}>
                {isLoading ? <Icon type={'loading'} /> : '数据已经加载完啦~'}
              </div>)}
              renderRow={row}
              useBodyScroll={this.state.useBodyScroll}
              style={this.state.useBodyScroll ? {} : {
                height: this.state.height,
                // border: '1px solid #ddd',
                margin: '5px 0',
              }}
              pullToRefresh={<PullToRefresh
                refreshing={refreshing}
                onRefresh={()=>{this.props.onRefresh()}}
                
              />}
              onEndReached={(event)=>{this.props.onEndReached(event)}}
              onEndReachedThreshold={50}
              pageSize={5}
            />
            : <div>{skeletonData}</div>
        }</div>
    );
  }
}
ListViewComp.defaultProps = {
  useBodyScroll:false
};
ListViewComp.propTypes = {
  row: PropTypes.func.isRequired,
  useBodyScroll:PropTypes.bool

}
export default withRouter(ListViewComp);
