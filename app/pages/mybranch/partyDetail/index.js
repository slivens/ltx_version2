import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import {Button, WhiteSpace, Flex, Toast} from 'antd-mobile';
import axios from 'axios';
import commonUrl from '../../../config';
import DetailBox from './detailBox';
import {connect} from 'react-redux';

const test = "http://127.0.0.1:8088";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            memberStatus: {},
        };
    }

    componentWillMount() {
        this.fetchData()
    }

    fetchData = () => {
        const {pathname} = this.props.location;
        const actId = pathname.split('/')[2];
        axios.post(`${test}/app/subAct/judgePersonStatus.do`, {activityId: actId, userId: this.props.userId})
            .then(res => {
                if (res.data.code === "success") {
                    this.setState({memberStatus: res.data.data})
                }
            });
        axios.post(`${test}/app/subAct/getActDetails.do`, {activityId: actId})
            .then(res => {
                if (res.data.code === "success") {
                    this.setState({detail: res.data.data})
                }
            })
    };

    componentDidMount() {

    }


    regPersons = (items) => {
        if (items) {
            if (items.length > 5) {
                return items.slice(0, 6).map((item, index) => {
                    if (item.sex === "男") {
                        return (
                            <img src={require('../../../../assets/images/male.png')} key={index}/>
                        )
                    } else {
                        return <img src={require('../../../../assets/images/female.png')} key={index}/>
                    }
                })
            } else {
                return items.map(
                    (item, index) => {
                        if (item.sex === "男") {
                            return (
                                <img src={require('../../../../assets/images/male.png')} key={index}/>
                            )
                        } else {
                            return <img src={require('../../../../assets/images/female.png')} key={index}/>
                        }
                    }
                )
            }
        }
    };

    actClick = (status) => {
        const {pathname} = this.props.location;
        const actId = pathname.split('/')[2];
        const {userId} = this.props;
        let params = {activityId: actId, userId};
        if (status.actStatus === 0) {
            if (status.isReg === 0) {
                axios.post(`${test}/app/subAct/personReg.do`, params)
                    .then(res => {
                        if (res.data.code === "success") {
                            Toast.success(res.data.message);
                            this.fetchData();
                        } else {
                            Toast.fail(res.data.message)
                        }
                    })
            } else {
                axios.post(`${test}/app/subAct/cancelReg.do`, params)
                    .then(res => {
                        if (res.data.code === "success") {
                            Toast.success(res.data.message);
                            this.fetchData();
                        } else {
                            Toast.fail(res.data.message)
                        }
                    })
            }
        }


    };

    renderActStatus = (status) => {
        if (status.actStatus === 0) {
            return status.isReg ? "取消报名" : "我要报名";
        } else if (status.actStatus === 1) {
            return "活动进行中";
        } else if (status.actStatus === 2) {
            return "活动已结束"
        }
    };

    btnColor = (status) => {
        //未报名显示高亮按钮
        if (status.actStatus == 0 && !status.isReg) {
            return "#F5432F"
        } else {
            return "#c1c1c1"
        }
    };


    render() {
        const {detail, memberStatus} = this.state;
        const {pathname} = this.props.location;
        const actId = pathname.split('/')[2];
        return (
            <div className="zbdetail">
                <div className="zbdetail_topbar">
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
                    活动详情
                </div>
                <div className="zbdetail_box">
                    <div className="zbdetail_pic">
                        <img src={detail.actPoster || `${commonUrl}/app/getUploadImg.do?fn=default.jpg`}
                             onError={(e) => {
                                 e.target.onerror = null;
                                 e.target.src = `${commonUrl}/app/getUploadImg.do?fn=default.jpg`
                             }}
                        />
                    </div>
                    <div className="shuoming">
                        <div className="shuoming_title">{detail.title}</div>
                        <div className="shuoming_detail">
                        <span>
                            <Icon type="tags"/>
                            &nbsp;{detail.actType}
                            </span>
                            <span>
                            <Icon style={{marginLeft: "10px"}} type="user"/>
                                &nbsp;已报名 {detail.regPersonNum} 人
                                </span>
                        </div>
                    </div>
                    <div className="active_detail">
                        <div className="active_detail_item">
                            <div className="title"><Icon type="clock-circle"/>活动时间</div>
                            <div className="content">{detail.actTime}</div>
                        </div>
                        <div className="active_detail_item">
                            <div className="title"><Icon type="clock-circle"/>活动地点</div>
                            <div className="content">{detail.actAddress}</div>
                        </div>
                    </div>
                    <WhiteSpace />
                    <DetailBox title={"活动详情"}>
                        <div>
                            <ul>
                                <li><span>活动主题</span>&nbsp;&nbsp;<i>{detail.title}</i></li>
                                <li><span>活动时间</span>&nbsp;&nbsp;<i>{detail.actTime}</i></li>
                                <li><span>报名时间</span>&nbsp;&nbsp;<i>{detail.regTime}</i></li>
                                <li><span>活动地点</span>&nbsp;&nbsp;<i>{detail.actAddress}</i></li>
                                <li><span>活动流程</span>&nbsp;&nbsp;
                                    <i dangerouslySetInnerHTML={{__html: detail.actPlan}}></i>
                                </li>
                                <li><span>联系人</span>&nbsp;&nbsp;<i>{detail.contactPerson}</i></li>
                                <li><span>联系电话</span>&nbsp;&nbsp;<i>{detail.contactNum}</i></li>
                            </ul>
                        </div>
                    </DetailBox>
                    <WhiteSpace />
                    <DetailBox title={"活动主办方"}>
                        <div className="active-person">
                            <img src={require('../../../../assets/images/logo.png')}/>
                            <div className="active-person-content">
                                <div className="active-person-content-title">{detail.title}</div>
                                <div className="active-person-content-info">
                                    <span>联系人: {detail.contactPerson}</span>&nbsp;&nbsp;
                                    <span>联系电话: {detail.contactNum}</span></div>
                            </div>
                        </div>
                    </DetailBox>
                    <WhiteSpace />
                    <DetailBox actId={actId} member={detail.regPersons} rightText={"查看更多"} title={"报名人员"}>
                        <div className="active-member">
                            <Flex>
                                {this.regPersons(detail.regPersons)}
                            </Flex>
                        </div>
                    </DetailBox>
                </div>
                <div className="activebtn">
                    <Flex style={{height: "100%"}} align="center" justify="center">
                        <Button
                            onClick={() => this.actClick(memberStatus)}
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                                width: "2.8rem",
                                margin: "0 auto",
                                background: this.btnColor(memberStatus),
                                // marginLeft:".1rem"
                            }}
                        >
                            {this.renderActStatus(memberStatus)}
                        </Button>
                    </Flex>
                </div>
            </div>
        );
    }
}
const
    mapStateToProps = (state, ownProps) => ({
        userId: state.userinfo.id
    });
const
    mapdispatchToProps = (dispatch, ownProps) => {
        return {}
    };
export
default

connect(mapStateToProps, mapdispatchToProps)

(
    withRouter(index)
)
;
