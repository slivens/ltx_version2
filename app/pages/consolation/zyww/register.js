import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {
    SearchBar, Accordion, List, Toast, InputItem, Button, WhiteSpace,
    DatePicker, TextareaItem, Picker, ImagePicker
} from 'antd-mobile';

import Icon from 'antd/es/icon';
import Form from 'antd/es/form';
import 'antd/es/icon/style';
import 'antd/es/avatar/style';
import './style/index.less';
import {caseData,zywwDetailInfoData} from "../components/data";
import Topbar from "../components/topbar";
import CommitFooterbar from "../components/commitFooterbar";
import commonUrl from '../../../config';

const prefix = "zyww";

class ZywwRegisterConn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datasource: "",
            files: [],
            detailData: undefined
        }
    }

    componentWillMount() {
        const {personCategory, unitId} = this.props;
        //const detid=this.props.location.pathname.split('/')[2];
        /* Toast.loading('Loading...', 0);
         axios.post(`${commonUrl}/app/qryMailList.do`, {personCategory, unitId}).then(
         res => {
         if (res.data.code === 'success') {
         this.setState({datasource: res.data.data})
         Toast.hide();
         } else {
         Toast.hide();
         Toast.fail(res.data.message)
         }
         }
         )*/
    }

    SearchChange = (searchContent) => {
        const {personCategory, unitId} = this.props;
        // Toast.loading('Loading...',0);
        /*axios.post(`${commonUrl}/app/qryMailList.do`, {personCategory, unitId, searchContent}).then(
         res => {
         if (res.data.code === 'success') {
         this.setState({datasource: res.data.data})
         //    Toast.hide();
         } else {
         // Toast.hide();
         Toast.fail(res.data.message)
         }
         }
         )*/
    };
    imagePickerChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    };
    handleCommit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                /*axios.post(`${commonUrl}/zyww/add.do`, values)
                 .then(res => {
                 if (res.data.code === "success") {
                 clearTimeout(this.timer)
                 //Toast.success('提交成功', 1, () => this.timer = setTimeout(this.props.history.push('/home'), 2000));
                 } else {
                 Toast.fail(`提交失败：${res.data.message}`, 2)
                 }
                 }).catch((err) => {
                 Toast.fail(`提交失败：${err}`, 2)
                 })*/
            }
        });
    };


    render() {
        const {files,detailData} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={prefix}>
                <Topbar title="住院慰问登记" onClick={() => this.props.history.goBack()}/>
                <Form className={prefix + "_dj"}>
                    <List>
                        <Form.Item>
                            {getFieldDecorator('wwdx', {
                                initialValue: detailData && detailData.wwdx,
                                rules: [{required: true, message: '请选择慰问对象'}],
                            })(
                                <InputItem
                                    placeholder="请选择慰问对象"
                                    clear
                                >慰问对象</InputItem>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('wwdw', {
                                initialValue: detailData && detailData.wwdw,
                                rules: [{required: true, message: '请选择慰问单位'}],
                            })(
                                <InputItem
                                    placeholder="请选择慰问单位"
                                    clear
                                >慰问单位</InputItem>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('wwsj', {
                                initialValue: detailData && new Date(detailData.wwsj),
                                rules: [{required: true, message: '请选择慰问时间'}],
                            })(
                                <DatePicker
                                    mode="date"
                                    title="慰问时间"
                                    extra="请选择慰问时间"
                                >
                                    <List.Item className={prefix + "_dj_date"} arrow="horizontal">慰问时间</List.Item>
                                </DatePicker>
                            )}
                        </Form.Item>

                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Form.Item>
                            {getFieldDecorator('jzyy', {
                                initialValue: detailData && detailData.jzyy,
                                rules: [{required: true, message: '请输入就诊医院'}],
                            })(
                                <InputItem
                                    placeholder="请输入就诊医院"
                                    clear
                                >就诊医院</InputItem>
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('sbsj', {
                                initialValue: detailData && new Date(detailData.sbsj),
                                rules: [{required: true, message: '请选择生病时间'}],
                            })(
                                <DatePicker
                                    mode="date"
                                    title="生病时间"
                                    extra="请选择生病时间"
                                >
                                    <List.Item className={prefix + "_dj_date"} arrow="horizontal">生病时间</List.Item>
                                </DatePicker>
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('sblx', {
                                initialValue: detailData && detailData.sblx,
                                rules: [{required: true, message: '请输入生病类型'}],
                            })(
                                <InputItem
                                    placeholder="请输入生病类型"
                                    clear
                                >生病类型</InputItem>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('sbyy', {
                                initialValue: detailData && detailData.sbyy,
                                rules: [{required: true, message: '请输入生病原因'}],
                            })(  <InputItem
                                    placeholder="请输入生病原因"
                                    clear
                                >生病原因</InputItem>
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('zysj', {
                                initialValue: detailData && new Date(detailData.zysj),
                                rules: [{required: true, message: '请选择住院时间'}],
                            })(
                                <DatePicker
                                    mode="date"
                                    title="住院时间"
                                    extra="请选择住院时间"
                                    className={prefix + "_dj_date"}
                                >
                                    <List.Item className={prefix + "_dj_date"} arrow="horizontal">住院时间</List.Item>
                                </DatePicker>
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('zyjl', {
                                initialValue: detailData && detailData.zyjl,
                                rules: [{required: true, message: '请输入住院记录'}],
                            })(
                                <InputItem
                                    placeholder="请输入住院记录"
                                    clear
                                >住院记录</InputItem>
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('sfkf', {
                                initialValue: detailData && detailData.kf,
                                rules: [{required: true, message: '请选择是否康复'}],
                            })(

                                <Picker
                                    /* value={this.state.activityType}
                                     onChange={v => this.setState({activityType: v})}*/
                                    title="是否康复"
                                    extra="请选择是否康复"
                                    data={caseData}
                                    cols={1}>
                                    <List.Item className={prefix + "_dj_date"} arrow="horizontal">是否康复</List.Item>
                                </Picker>
                            )}
                        </Form.Item>


                        <Form.Item>
                            {getFieldDecorator('bz', {
                                initialValue: detailData && detailData.bz,
                                rules: [{required: true, message: '请输入备注内容'}],
                            })(
                                <TextareaItem
                                    title="备注"
                                    placeholder="请输入备注内容"
                                    clear
                                    rows={3}
                                />
                            )}
                        </Form.Item>

                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <Form.Item>
                            {getFieldDecorator('wwry', {
                                initialValue: detailData && detailData.wwry,
                                rules: [{required: true, message: '请选择慰问人员'}],
                            })(
                                <InputItem
                                    placeholder="请选择慰问人员"
                                    clear
                                >慰问人员</InputItem>
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('wwqk', {
                                initialValue: detailData && detailData.wwqk,
                                rules: [{required: true, message: '请输入慰问情况'}],
                            })(
                                <TextareaItem
                                    title="慰问情况"
                                    placeholder="请输入慰问情况"
                                    clear
                                    rows={3}
                                />
                            )}
                        </Form.Item>


                        <Form.Item>
                            {getFieldDecorator('yjjy', {
                                initialValue: detailData && detailData.yjjy,
                                rules: [{required: true, message: '请输入意见建议'}],
                            })(
                                <TextareaItem
                                    title="意见建议"
                                    placeholder="请输入意见建议"
                                    clear
                                    rows={3}
                                />
                            )}
                        </Form.Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <InputItem
                            editable={false}
                            className={prefix + "_dj_image"}
                        >
                            关怀展示
                            <span className={prefix + "_dj_image_tip"}>最多可上传5张</span>
                        </InputItem>

                        <Form.Item>
                            {getFieldDecorator('ghzs', {
                                rules: [{required: true, message: '请上传图片'}],
                            })(
                                <ImagePicker
                                    files={files}
                                    onChange={this.imagePickerChange}
                                    onImageClick={(index, fs) => console.log(index, fs)}
                                    selectable={files.length < 5}
                                    multiple={true}
                                    length="1"
                                >
                                    关怀展示
                                </ImagePicker>
                            )}
                        </Form.Item>


                    </List>
                    <CommitFooterbar commit={this.handleCommit}/>
                </Form>

            </div>
        );
    }
}

const ZywwRegister = withRouter(Form.create({name: 'zyww_dj'})(ZywwRegisterConn));
export default connect(null, null)(withRouter(ZywwRegister));