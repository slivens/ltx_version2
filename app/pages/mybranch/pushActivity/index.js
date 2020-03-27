import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import { List, TextareaItem, WhiteSpace, ImagePicker, DatePicker, Picker, Button, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
const caseData = [

    {
        label: '方案A',
        value: '方案A',
    },
    {
        label: '方案B',
        value: '方案B',
    },
    {
        label: '方案C',
        value: '方案C',
    },
    {
        label: '方案D',
        value: '方案D',
    },



]

class PushActivity extends Component {
    state = {
        files: [],
        multiple: false,
        startDate: "",
        endDate: "",
        activityType: "",
        playtime: "",
        endplaytime: ""
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
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
    pushHandle=()=>{
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
            console.log('@value',value)
          });
    }
    render() {
        const { getFieldProps } = this.props.form;
        const { files } = this.state;
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
                            
                            title={<div><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;活动海报</div>}
                            autoHeight
                            editable={false}
                            labelNumber={5}
                        />
                        <ImagePicker
                            files={files}
                            onChange={this.onChange}
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
                            initialValue: this.state.startDate
                          })}
                            mode="datetime"
                            title="开始时间"
                            extra="请选择"
                            value={this.state.startDate}
                            onChange={startDate => this.setState({ startDate })}
                        >
                            <List.Item className="pushTime" arrow="horizontal"><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;开始时间</List.Item>
                        </DatePicker>
                        <DatePicker
                        {...getFieldProps('actEndTime')}
                            mode="datetime"
                            title="结束时间"
                            extra="请选择"
                            value={this.state.endDate}
                            onChange={endDate => this.setState({ endDate })}
                        >
                            <List.Item className="pushTime" arrow="horizontal"><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;结束时间</List.Item>
                        </DatePicker>
                    </List>

                    <WhiteSpace />

                    <List>
                        <Picker
                        {...getFieldProps('actType')}
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
                        {...getFieldProps('regStartTime')}
                            mode="datetime"
                            title="报名开始"
                            extra="请选择"
                            value={this.state.playtime}
                            onChange={playtime => this.setState({ playtime })}
                        >
                            <List.Item className="pushTime" arrow="horizontal"><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;报名开始</List.Item>
                        </DatePicker>
                        <DatePicker
                        {...getFieldProps('regEndTime')}
                            mode="datetime"
                            title="报名结束"
                            extra="请选择"
                            value={this.state.endplaytime}
                            onChange={endplaytime => this.setState({ endplaytime })}
                        >
                            <List.Item className="pushTime" arrow="horizontal"><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;报名结束</List.Item>
                        </DatePicker>
                        <TextareaItem
                            title={<div><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;邀请人员</div>}
                            editable={false}
                        />
                        <TextareaItem
                            {...getFieldProps('regEndTime')}
                            title={<div><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;主办方</div>}
                            placeholder="输入活动名称"
                            clear

                        />
                        <TextareaItem
                        {...getFieldProps('contactPerson')}
                            title={<div><span style={{ color: "red", verticalAlign: "middle" }}>*</span>&nbsp;联系人</div>}
                            placeholder="输入联系人"
                            clear

                        />
                        <TextareaItem
                        {...getFieldProps('contactNumber')}
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
            </div>
        );
    }
}
const PushActivitycomp = createForm()(PushActivity);
export default withRouter(PushActivitycomp);