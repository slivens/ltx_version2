/*
 * @Author: Sliven
 * @Date: 2020-04-23 14:48:51
 * @LastEditors: Sliven
 * @LastEditTime: 2020-04-26 15:05:18
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
import { Tabs, WhiteSpace, Badge, Modal } from 'antd-mobile';
import { GGWTabs } from '../../redux/actions';
import ListView from '../../components/homeListView/listViewComp';
import classnames from 'classnames';
class ggwView extends Component {
    state = {
        nowtabs: {},
        tabsArr: []
    }
    tabsOnchange = (tab, index) => {
            this.setState({ nowtabs: tab });
            localStorage.setItem("ggwTab", JSON.stringify(tab));
    }
    renderTabs = (arr) => {
        return arr.map(item => ({
            title: item.noticeColumn,
            key: item.noticeCode
        }))
    }
    ShouldComponentUpdate( nextProps, nextState){
        console.log('@@@@@@@@@@@nextState',nextProps,nextState)
    }
    componentWillMount() {
        const { ggwTasbs } = this.props;
        axios.post(`${commonUrl}/app/menu/qryAppTabList.do`, { columnCode: ggwTasbs.code })
            .then(res => {
                if (res.data.code === 'success') {
                    let nowtabs;
                    const tabs = this.renderTabs(res.data.data);
                    this.props.GGWTabs({ tabs: tabs })
                    if (localStorage.getItem("ggwTab")) {
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
                    this.setState({ tabsArr: tabs, nowtabs: nowtabs })
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
        console.log('@@@@@this.state.nowtabs.code', this.state.nowtabs)
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
                            <ListView
                                params={listViewParams}
                                url={`${commonUrl}/app/qryNewsPageListByCode.do`}
                                columnCode={this.state.nowtabs.key}
                                row={this.row}
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

