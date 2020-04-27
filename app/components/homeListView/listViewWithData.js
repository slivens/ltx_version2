import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {PullToRefresh, ListView, Button, Icon} from 'antd-mobile';
import Axios from 'axios';
import Skeleton from 'antd/es/skeleton';
import "antd/es/skeleton/style";


let pageIndex = 1;  //页码
let dataBlobs = []; //数据模型
const skeletonCount = 10; //预显示骨架数

class ListViewComp extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            hasMore: true,
            dataSource,
            refreshing: false,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: props.useBodyScroll,
            SkeletonLoading: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.refreshing){
            dataBlobs=[]
        }
        this.renderDataBlobs(nextProps.data);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(dataBlobs),
            refreshing: false,
            isLoading: nextProps.isLoading,
            SkeletonLoading: false,
        });
    }

    componentWillMount() {
        this.renderDataBlobs(this.props.data);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(dataBlobs),
            refreshing:false,
            isLoading: this.props.isLoading,
            SkeletonLoading: false,
        });
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({height: hei})
    }

    componentWillUnmount() {
        dataBlobs = []
    }

    componentDidUpdate() {
        document.getElementsByClassName('am-list-view-scrollview')[0].style.border = 0;
        document.getElementsByClassName('am-list-view-scrollview')[0].style.margin = 0;
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    renderDataBlobs = (data) => {
        dataBlobs = dataBlobs.concat(data)
    };

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({height: hei});
    }

    /**
     * @description: 下拉刷新函数，手势下拉，整体列表刷新。
     * @param {type}
     * @return:
     */
    onRefresh = () => {
        dataBlobs = [];
        pageIndex = 1;
        this.setState({hasMore: true, refreshing: true});
        // simulate initial Ajax
        setTimeout(() => {
            this.props.fetchData();
        }, 600)
    };
    /**
     * @description: 列表拉到底部进行刷新
     * @param {type}
     * @return:
     */
    onEndReached = (event) => {
        this.setState({isLoading: true});
        if (!this.state.hasMore) {
            return this.setState({isLoading: false});
        }
        this.props.fetchData(++pageIndex)
    };

    render() {
        const {row} = this.props;
        const {height, useBodyScroll,isLoading} = this.state;
        // const getRowCount = this.state.dataSource.getRowCount()||NUM_ROWS;
        const skeletonData = Array(skeletonCount).fill(< Skeleton active/>);
        return (
            <div>
                {
                    !this.state.SkeletonLoading ?
                        <ListView
                            key={this.state.useBodyScroll ? '0' : '1'}
                            ref={el => this.lv = el}
                            dataSource={this.state.dataSource}
                            renderFooter={() => (<div style={{padding: 5, textAlign: 'center'}}>
                                {isLoading ? <Icon type={'loading'}/> : '数据已经加载完啦~'}
                            </div>)}
                            renderRow={row}
                            style={useBodyScroll ? {} : {
                                height: height,
                                border: '1px solid #ddd',
                                margin: '5px 0',
                            }}
                            pullToRefresh={<PullToRefresh
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={500}
                            pageSize={5}
                        />
                        : <div>{skeletonData}</div>
                }</div>
        );
    }
}
ListViewComp.defaultProps = {
    useBodyScroll: true
};
ListViewComp.propTypes = {
    row: PropTypes.func.isRequired,
    useBodyScroll: PropTypes.bool
};
export default withRouter(ListViewComp);
