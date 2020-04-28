/*
 * @Author: Sliven
 * @Date: 2020-04-19 20:44:58
 * @LastEditTime: 2020-04-28 09:22:52
 * @LastEditors: Sliven
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\components\homeListView\listViewComp.js
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh, ListView, Button, Icon } from 'antd-mobile';
import Skeleton from 'antd/es/skeleton';
import "antd/es/skeleton/style";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
const skeletonCount = 10 //预显示骨架数
class ListViewComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: document.documentElement.clientHeight,
      useBodyScroll: props.useBodyScroll,
    };
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
    this.setState({ height: hei })
  }

  render() {
    const { row, dataSource, refreshing, isLoading, SkeletonLoading } = this.props;
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
                onRefresh={() => { this.props.onRefresh() }}

              />}
              onEndReached={(event) => { this.props.onEndReached(event) }}
              onEndReachedThreshold={50}
              pageSize={5}
            />
            : <div style={{backgroundColor:"#fff"}}>{skeletonData}</div>
        }</div>
    );
  }
}
ListViewComp.defaultProps = {
  useBodyScroll: false
};
ListViewComp.propTypes = {
  row: PropTypes.func,
  useBodyScroll: PropTypes.bool,
  refreshing: PropTypes.bool,
  isLoading: PropTypes.bool,
  hasMore: PropTypes.bool,
  SkeletonLoading: PropTypes.bool,
  dataSource: PropTypes.array,
  onRefresh: PropTypes.func,
  onEndReached: PropTypes.func
}

export default withRouter(ListViewComp);
