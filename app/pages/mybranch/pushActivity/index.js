import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import { List, TextareaItem, WhiteSpace, ImagePicker, DatePicker, Picker, Button, Flex, Modal, Badge, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import Axios from 'axios';
import commonUrl from '../../../config';
import MemberSelect from './memberSelect';
import classnames from 'classnames'
const caseData = [

    {
        label: '支部党员大会',
        value: '1',
    },
    {
        label: '支委会',
        value: '2',
    },
    {
        label: '主题党课',
        value: '3',
    },
]
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
class PushActivity extends Component {
    state = {
        files: [],
        multiple: false,
        actStartTime: "",
        actEndTime: "",
        activityType: "",
        regStartTime: "",
        regEndTime: "",
        modal1: false,
        modal2: false,
    }
    resImgName=""
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    imgUpload = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
        if (files.length) {
            let formData = new FormData()
            formData.append('imgFile',files[0].url);
            let config = { headers: { 'Content-Type': 'multipart/form-data' } }
            Axios.post(`${commonUrl}/app/img/uploadActPoster.do`, formData, config)
                .then(res => {
                    if (res.data.code === 'success') {
                        this.resImgName=res.data.data
                        Toast.success('图片上传成功')
                    } else {
                        Toast.fail(`图片上传失败：${res.message}`)
                    }
                })
            
            
        }
    }
    componentDidMount() {

    }
    validateDatePicker = (rule, date, callback) => {
        if (date && date.getMinutes() !== 15) {
            callback();
        } else {
            callback(new Error('15 is invalid'));
        }
    }
    pushHandle = () => {
        const { allmember, userinfo } = this.props;
        const showMember = allmember.filter(item => item.checked)
        let showMemberName = []
        if (showMember.length) {
            showMember.forEach(item => {
                showMemberName.push(item.value)
            })
        }
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            console.log('@value', value)
            const newobj = {
                ...value,
                actType: value.actType.toString(),
                userIds: showMemberName.join(),
                unitId: userinfo.partyBranchId,
                operUser: userinfo.id,
                actPoster:this.resImgName

            }
            for (let item in newobj) {
                switch (item) {
                    case 'actPlan':
                        if (!newobj['actPlan']) return Toast.info('请输入活动方案')
                    case 'title':
                        if (!newobj['title']) return Toast.info('请输入活动名称')
                    case 'actType':
                        if (!newobj['actType']) return Toast.info('请输入活动类型')
                    case 'actStartTime':
                        if (!newobj['actStartTime']) return Toast.info('请选择开始时间')
                    case 'actEndTime':
                        if (!newobj['actEndTime']) return Toast.info('请选择结束时间')
                    case 'actAddress':
                        if (!newobj['actAddress']) return Toast.info('请输入活动地点')
                    case 'regStartTime':
                        if (!newobj['regStartTime']) return Toast.info('请选择报名时间')
                    case 'regEndTime':
                        if (!newobj['regEndTime']) return Toast.info('请选择报名结束时间')
                    case 'hostUnit':
                        if (!newobj['hostUnit']) return Toast.info('请输入主办方')
                    case 'contactNumber':
                        if (!newobj['contactNumber']) return Toast.info('请输入联系电话')
                    case 'contactPerson':
                        if (!newobj['contactPerson']) return Toast.info('请输入联系人')
                    case 'userIds':
                        if (!newobj['userIds']) return Toast.info('请选择邀请人员')
                    default:
                        break;
                }
            }
            Axios.post(`${commonUrl}/app/activity/saveActivity.do`, newobj)
                .then(res => {
                    if (res.data.code === 'success') {
                        Toast.success('发布成功')
                    } else {
                        Toast.fail(`发布失败：${res.message}`)
                    }
                })
        });
    }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    render() {
        const { getFieldProps } = this.props.form;
        const { allmember } = this.props;
        console.log('@@@@@@@allmember', allmember)
        const showMember = allmember.filter(item => item.checked)
        let showMemberName = []
        if (showMember.length) {
            showMember.forEach(item => {
                showMemberName.push(item.label)
            })
        }
        const { files } = this.state;
        const { userinfo } = this.props;
        return (
            <div className="pushactive">
                <div className="pushactive_topbar">
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
                    发布活动
                </div>
                <div className="pushactive_box">

                    <WhiteSpace />
                    <List>
                        <TextareaItem

                            title={
                                <div><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;活动海报</div>
                            }
                            autoHeight
                            editable={false}
                            labelNumber={5}
                        />
                        <ImagePicker
                            files={files}
                            onChange={this.imgUpload}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 1}
                            multiple={false}
                            length="1"
                        />
                    </List>
                    <WhiteSpace />
                    <List>
                        <TextareaItem
                            {...getFieldProps('title')}
                            title={<div><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;活动名称</div>}
                            placeholder="输入活动名称"
                            clear

                        />
                        <TextareaItem
                            {...getFieldProps('actAddress')}
                            title={<div><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;活动地点</div>}
                            placeholder="输入活动地点"
                            clear
                        />
                        <DatePicker
                            {...getFieldProps('actStartTime', {
                                initialValue: this.state.actStartTime
                            })}
                            mode="datetime"
                            title="开始时间"
                            extra="请选择"
                            value={this.state.actStartTime}
                            onChange={actStartTime => this.setState({ actStartTime })}
                        >
                            <List.Item className="pushTime" arrow="horizontal"><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;开始时间</List.Item>
                        </DatePicker>
                        <DatePicker
                            {...getFieldProps('actEndTime', {
                                initialValue: this.state.actEndTime
                            })}
                            mode="datetime"
                            title="结束时间"
                            extra="请选择"
                            value={this.state.actEndTime}
                            onChange={actEndTime => this.setState({ actEndTime })}
                        >
                            <List.Item className="pushTime" arrow="horizontal"><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;结束时间</List.Item>
                        </DatePicker>
                    </List>

                    <WhiteSpace />

                    <List>
                        <Picker
                            {...getFieldProps('actType', {
                                initialValue: this.state.activityType
                            })}
                            title="活动类型"
                            value={this.state.activityType}
                            onChange={v => this.setState({ activityType: v })}
                            data={caseData}
                            cols={1} >
                            <List.Item className="pushTime" arrow="horizontal"><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;活动类型</List.Item>
                        </Picker>
                        <TextareaItem
                            {...getFieldProps('actPlan')}
                            title={<div><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;活动方案</div>}
                            placeholder="输入活动内容"
                            rows={5}
                            clear
                            count={500}
                        />
                    </List>
                    <WhiteSpace />
                    <List>
                        <DatePicker
                            {...getFieldProps('regStartTime', {
                                initialValue: this.state.regStartTime
                            })}
                            mode="datetime"
                            title="报名开始"
                            extra="请选择"
                            value={this.state.regStartTime}
                            onChange={regStartTime => this.setState({ regStartTime })}
                        >
                            <List.Item className="pushTime" arrow="horizontal"><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;报名开始</List.Item>
                        </DatePicker>
                        <DatePicker
                            {...getFieldProps('regEndTime', {
                                initialValue: this.state.regEndTime
                            })}
                            mode="datetime"
                            title="报名结束"
                            extra="请选择"
                            value={this.state.regEndTime}
                            onChange={regEndTime => this.setState({ regEndTime })}
                        >
                            <List.Item className="pushTime" arrow="horizontal"><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;报名结束</List.Item>
                        </DatePicker>
                        {/*<TextareaItem
                            title={<div><span style={{ color: "red", verticalAlign: "middle" }}>*</span>
                            &nbsp;邀请人员</div>}
                            editable={false}
                        />*/}
                        <List.Item

                            className={classnames("select_member",'pushTime')}
                            extra={
                                <div
                                    className="select_member_box"
                                    onClick={() => { this.setState({ modal2: true }) }}
                                >
                                    {showMemberName.length ? showMemberName.join('、') : ""}
                                </div>}
                            arrow="horizontal">
                            <span style={{ color: "red", verticalAlign: "middle" }}>*</span>
                            &nbsp;<span onClick={() => { this.setState({ modal1: true }) }}>邀请人员</span></List.Item>
                        <TextareaItem
                            {...getFieldProps('hostUnit', {
                                initialValue: userinfo.partyBranchName
                            })}
                            title={<div><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;主办方</div>}
                            placeholder="输入活动名称"
                            clear

                        />
                        <TextareaItem
                            {...getFieldProps('contactPerson', {
                                initialValue: userinfo.realName
                            })}
                            title={<div><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;联系人</div>}
                            placeholder="输入联系人"
                            clear

                        />
                        <TextareaItem
                            {...getFieldProps('contactNumber', {
                                initialValue: userinfo.phoneNum
                            })}
                            title={<div><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;联系电话</div>}
                            placeholder="输入联系电话"
                            clear

                        />
                    </List>
                    <WhiteSpace />
                </div>
                <div className="activebtn">
                    <Flex style={{ height: "100%" }} align="center" justify="center">
                        <Button
                            onClick={this.pushHandle}
                            style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                                width: "80%",
                                margin: "0 auto",
                                background: "#f83e2f",
                                // marginLeft:".1rem"
                            }}
                        >发布</Button>
                    </Flex>
                </div>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="全部邀请人员"
                    footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ height: 100, overflow: 'scroll' }}>
                        {showMemberName.length
                            ?
                            showMemberName.map((item, index) => {
                                return (
                                    <Badge
                                        key={index}
                                        text={item}
                                        style={{ marginLeft: 12, padding: '0 3px', backgroundColor: '#21b68a', borderRadius: 2 }} />
                                )
                            }
                            ) :
                            "未选择"}

                    </div>
                </Modal>
                <Modal
                    className="memberClassName"
                    visible={this.state.modal2}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal2')}
                    title={null}
                    footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal2')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ height: '100%', overflow: 'scroll' }}>

                        <MemberSelect onClose={() => this.setState({ modal2: false })} />
                    </div>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state, ownprops) => ({
    allmember: state.allMemberData,
    userinfo: state.userinfo
})
const mapDispatchToProps = (dispatch, ownprops) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(createForm()(PushActivity)))
