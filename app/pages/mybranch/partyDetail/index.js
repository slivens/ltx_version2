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

import {judgePersonStatus, actDetails} from '../components/data';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            memberStatus: {},
        };
        this.personStaus = {};
        this.leaveStatus = {};
    }

    componentWillMount() {
        this.fetchData()
    }

    fetchData = () => {
        const {pathname} = this.props.location;
        const actId = pathname.split('/')[2];
        this.setState({memberStatus: judgePersonStatus.data})
        this.setState({detail: actDetails.data})
        /* axios.post(`${commonUrl}/app/activity/judgePersonStatus.do`, {activityId: actId, userId: this.props.userId})
         .then(res => {
         if (res.data.code === "success") {
         this.setState({memberStatus: res.data.data})
         }
         });*/
        /* axios.post(`${commonUrl}/app/activity/findActDetails.do`, {activityId: actId})
         .then(res => {
         if (res.data.code === "success") {
         this.setState({detail: res.data.data})
         }
         })*/
    };

    componentDidMount() {

    }

    leave = (status) => {
        if (status.isLeave) {
            this.leaveStatus = {code: "5"};
            return "取消请假"
        } else {
            this.leaveStatus = {code: "3"};
            return "请假"
        }
    };


    regPersons = (items) => {
        if (items) {
            if (items.length > 5) {
                return items.slice(0, 6).map((item, index) => {
                    if (item.sex === "男") {
                        return (
                            <img src={require('../../../../assets/images/male.png')} key={index}/>
                        )
                    } else {
                        return <img src={require('../../../../assets/images/female.png')}/>
                    }
                })
            } else {
                return items.map(
                    (item, index) => {
                        if (item.sex === "男") {
                            return (
                                <img src={require('../../../../assets/images/male.png')}/>
                            )
                        } else {
                            return <img src={require('../../../../assets/images/female.png')}/>
                        }
                    }
                )
            }
        }
    };

    actClick = (type) => {
        const {pathname} = this.props.location;
        const actId = pathname.split('/')[2];
        const {userId} = this.props;
        axios.post(`${commonUrl}/app/activity/operatePerson.do`, {activityId: actId, userId, operateType: type.code})
            .then(res => {
                if (res.data.code === "success") {
                    Toast.success(res.data.message);
                    this.fetchData();
                } else {
                    Toast.fail(res.data.message)
                }
            })
    };

    renderActStatus = (status) => {
        if (status.isReg) {
            this.personStaus = {code: "4"}
        } else {
            this.personStaus = {code: "1"}
        }
        return status.isReg ? "取消报名" : "我要报名";
    };

    btncolor = (status) => {
        if (status.isReg) {
            return "#c1c1c1";
        } else {
            return "#F5432F";
        }
    };

    showQj = (status) => {
        if (status.isInvited) {
            if (status.actStatus == 3 && status.isReg) {
                return true
            }
            else return false
        } else {
            return false
        }
    };


    render() {
        const {detail, memberStatus} = this.state;
        const {pathname} = this.props.location;
        const actId = pathname.split('/')[2];
        /*   console.log('@@@@@@@detail', this.showQj(memberStatus));*/
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
                            onClick={() => this.actClick(this.personStaus)}
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                                width: "2.8rem",
                                margin: "0 auto",
                                background: this.btncolor(this.state.memberStatus),
                                // marginLeft:".1rem"
                            }}
                        >
                            {this.renderActStatus(this.state.memberStatus)}
                        </Button>
                    </Flex>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    userId: state.userinfo.id
})
const mapdispatchToProps = (dispatch, ownProps) => {
    return {}
}
export default connect(mapStateToProps, mapdispatchToProps)(withRouter(index));
