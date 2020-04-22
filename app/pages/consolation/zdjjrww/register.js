import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {
    List, Toast, InputItem, WhiteSpace,
    DatePicker, TextareaItem, Picker, ImagePicker,
} from 'antd-mobile';

import Form from 'antd/es/form';
import 'antd/es/icon/style';
import 'antd/es/avatar/style';

import Topbar from "../../../components/topbar/topbar";
import CommitFooterbar from "../components/commitFooterbar";
import PersonModal from "../components/personModal";
import {
    formatDate,
    formatCustomSelectDate,
    getInputItemTitle,
    getEditClassName
} from "../utils/utils";
import {sexData, holidayData} from "../data";
import {condolencesType, module} from "./resources";
import '../style/consolation.less';
import {prefix} from "../prefix";

import noAuth from '../../../util/noAuth';
import commonUrl from '../../../config';

class RegisterConn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            detailData: undefined,
            personModal: false,
        };
    }

    componentWillMount() {
        const detid = this.props.location.pathname.split('/')[2];
        if (detid) {
            Toast.loading('Loading...', 0);
            axios.post(`${commonUrl}/app/condolences/findCondolencesDetail.do`, {id: detid}).then(
                res => {
                    if (res.data.code === 'success') {
                        let detailData = res.data.data;
                        this.setState({
                            detailData: detailData,
                            files: detailData.imagePicker|| []
                        });
                        Toast.hide();
                    } else {
                        Toast.hide();
                        Toast.fail(res.data.message)
                    }
                }
            );
        }

    }

    imagePickerChange = (filesTemp, operationType, index) => {
        const {files} = this.state;
        if ("remove" === operationType) {
            let file = files[index];
            axios.post(`${commonUrl}/app/condolences/delCondolencesImg.do`, {id: file.id}).then(
                res => {
                    if (res.data.code !== 'success') {
                        Toast.fail(res.data.message)
                    }
                }
            );
        }
        this.setState({files: filesTemp});

    };


    handleCommit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {files, detailData} = this.state;
                if (files.length) {
                    let urls = [];
                    files.map((item) => {
                        if (!item.isUpdaload) {
                            urls.push(item.url);
                        }
                    });
                    if (urls.length > 0) {
                        let formData = new FormData();
                        formData.append('condolencesImgName', urls.join("||"));
                        let config = {headers: {'Content-Type': 'multipart/form-data'}};
                        axios.post(`${commonUrl}/app/condolences/uploadCondolencesImg.do`, formData, config)
                            .then(res => {
                                noAuth(res.data, () => this.props.history.push('/login'));
                                if (res.data.code === 'success') {
                                    let uploadImgResult = res.data.data;
                                    this.commitInfo(values, uploadImgResult);
                                } else {
                                    Toast.fail(`图片上传失败：${res.message}`)
                                }
                            })
                    } else {
                        files.map((item) => {
                            urls.push(item.id);
                        });
                        this.commitInfo(values, urls.join(","));
                    }
                } else {
                    Toast.info(`请选择图片上传！`)
                }
            }
        });
    };

    commitInfo = (values, attachmentIds) => {
        const {unitId, objectData} = this.props;
        let temp = objectData[module];
        let workerIds = [];
        if (temp) {
            const showMember = temp.filter(item => item.checked);
            if (showMember.length) {
                showMember.forEach(item => {
                    workerIds.push(item.value)
                })
            }
        }
        const params = {
            ...values,
            workerIds: workerIds.join(),
            registUnit: unitId,
            condolencesType: condolencesType,
            sex: values.sex[0],
            festivalType: values.festivalType[0],
            attachmentIds
        };
        axios.post(`${commonUrl}/app/condolences/saveCondolencesInfo.do`, params)
            .then(res => {
                noAuth(res.data, () => this.props.history.push('/login'));
                if (res.data.code === "success") {
                    clearTimeout(this.timer);
                    Toast.success('提交成功', 1, () => this.timer = setTimeout(this.props.history.push('/zdjjrww'), 2000));
                } else {
                    Toast.fail(`提交失败：${res.data.message}`, 2)
                }
            }).catch((err) => {
            Toast.fail(`提交失败：${err}`, 2)
        })
    };

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    };

    render() {
        const {files, detailData, personModal} = this.state;
        const {getFieldDecorator} = this.props.form;
        const {objectData, objectChange} = this.props;
        let temp = objectData[module];
        let isUpdate = objectChange[module];
        let showMemberName = [];
        let workerIds = [];
        if (temp) {
            const showMember = temp.filter(item => item.checked);
            if (showMember.length) {
                showMember.forEach(item => {
                    showMemberName.push(item.label);
                    workerIds.push(item.value);
                })
            }
        }
        return (
            <div className={prefix}>
                <Topbar title="重大节假日慰问登记" onClick={() => this.props.history.goBack()}/>
                <div className={prefix + "-register-box"}>
                    <Form className={prefix + "_dj"}>
                        <Form.Item>
                            {getFieldDecorator('id', {
                                initialValue: detailData && detailData.id,
                            })(
                                <input type="hidden"/>
                            )}
                        </Form.Item>
                        <List>
                            <List.Item className={prefix + "_dj_select"}>
                                <Form.Item>
                                    {getFieldDecorator('name', {
                                        initialValue: detailData && detailData.name,
                                        rules: [{required: true, message: '请输入慰问对象'}],
                                    })(
                                        <InputItem
                                            placeholder="请输入慰问对象"
                                            clear
                                        >  {getInputItemTitle("慰问对象")}</InputItem>
                                    )}
                                </Form.Item>
                            </List.Item>
                            <List.Item className={prefix + "_dj_select"}>
                                <Form.Item>
                                    {getFieldDecorator('condolencesUnit', {
                                        initialValue: detailData && detailData.condolencesUnit,
                                        rules: [{required: true, message: '请输入慰问单位'}],
                                    })(
                                        <InputItem
                                            placeholder="请输入慰问单位"
                                            clear
                                        >  {getInputItemTitle("慰问单位")}</InputItem>
                                    )}
                                </Form.Item>
                            </List.Item>
                            <List.Item arrow="horizontal">
                                <Form.Item>
                                    {getFieldDecorator('condolencesTime', {
                                        initialValue: formatDate(detailData, "condolencesTime"),
                                        rules: [{required: true, message: '请选择慰问时间'}],
                                    })(
                                        <DatePicker
                                            mode="date"
                                            title="慰问时间"
                                            extra="请选择慰问时间"
                                        >
                                            <List.Item
                                                className={prefix + "_dj_picker " + getEditClassName(detailData, "condolencesTime")}
                                            >
                                                {getInputItemTitle("慰问时间")}
                                            </List.Item>
                                        </DatePicker>
                                    )}
                                </Form.Item>
                            </List.Item>
                        </List>
                        <WhiteSpace size="lg"/>
                        <List>
                            <List.Item arrow="horizontal">
                                <Form.Item>
                                    {getFieldDecorator('festivalType', {
                                        initialValue: detailData ? [detailData.festivalType] : "",
                                        rules: [{required: true, message: '请选择节假日类型'}],
                                    })(
                                        <Picker
                                            title="节假日类型"
                                            extra="请选择节假日类型"
                                            data={holidayData}
                                            cols={1}>
                                            <List.Item
                                                className={prefix + "_dj_picker " + getEditClassName(detailData, "festivalType")}
                                            >
                                                {getInputItemTitle("节假日类型")}
                                            </List.Item>
                                        </Picker>
                                    )}
                                </Form.Item>
                            </List.Item>


                            <List.Item arrow="horizontal">
                                <Form.Item>
                                    {getFieldDecorator('sex', {
                                        initialValue: detailData ? [detailData.sex] : "",
                                        rules: [{required: true, message: '请选择性别'}],
                                    })(
                                        <Picker
                                            title="性别"
                                            extra="请选择性别"
                                            data={sexData}
                                            cols={1}>
                                            <List.Item
                                                className={prefix + "_dj_picker " + getEditClassName(detailData, "sex")}
                                            >
                                                {getInputItemTitle("性别")}
                                            </List.Item>
                                        </Picker>
                                    )}
                                </Form.Item>
                            </List.Item>


                            <List.Item className={prefix + "_dj_select"}>
                                <Form.Item>
                                    {getFieldDecorator('originalWork', {
                                        initialValue: detailData && detailData.originalWork,
                                        rules: [{required: true, message: '请输入原工作单位'}],
                                    })(
                                        <InputItem
                                            placeholder="请输入原工作单位"
                                            clear
                                        >  {getInputItemTitle("原工作单位")}</InputItem>
                                    )}
                                </Form.Item>
                            </List.Item>

                            <List.Item arrow="horizontal">
                                <Form.Item>
                                    {getFieldDecorator('participationWorkTime', {
                                        initialValue: formatDate(detailData, "participationWorkTime"),
                                        rules: [{required: true, message: '请选择参加工作时间'}],
                                    })(
                                        <DatePicker
                                            mode="date"
                                            title="参加工作时间"
                                            extra="请选择参加工作时间"
                                        >
                                            <List.Item
                                                className={prefix + "_dj_picker " + getEditClassName(detailData, "participationWorkTime")}
                                            >
                                                {getInputItemTitle("参加工作时间")}
                                            </List.Item>
                                        </DatePicker>
                                    )}
                                </Form.Item>
                            </List.Item>

                            <List.Item className={prefix + "_dj_select"}>
                                <Form.Item>
                                    {getFieldDecorator('homeAddress', {
                                        initialValue: detailData && detailData.homeAddress,
                                        rules: [{required: true, message: '请输入家庭住址'}],
                                    })(
                                        <TextareaItem
                                            title={getInputItemTitle("家庭住址")}
                                            placeholder="请输入家庭住址"
                                            clear
                                            rows={3}
                                        />
                                    )}
                                </Form.Item>

                            </List.Item>

                            <List.Item className={prefix + "_dj_select"}>
                                <Form.Item>
                                    {getFieldDecorator('remark', {
                                        initialValue: detailData && detailData.remark,
                                        rules: [{required: true, message: '请输入备注内容'}],
                                    })(
                                        <TextareaItem
                                            title={getInputItemTitle("备注")}
                                            placeholder="请输入备注内容"
                                            clear
                                            rows={3}
                                        />
                                    )}
                                </Form.Item>

                            </List.Item>

                        </List>
                        <WhiteSpace size="lg"/>
                        <List>
                            <List.Item className={prefix + "_dj_select"} arrow="horizontal">
                                <Form.Item>
                                    {getFieldDecorator('condolencesPerson', {
                                        initialValue: formatCustomSelectDate(detailData, "condolencesPerson", showMemberName, isUpdate),
                                        rules: [{required: true, message: '请选择慰问人员'}],
                                    })(
                                        <InputItem
                                            placeholder="请选择慰问人员"
                                            onClick={() => this.setState({personModal: true})}
                                        >
                                            {getInputItemTitle("慰问人员")}
                                        </InputItem>
                                    )}
                                </Form.Item>
                            </List.Item>

                            <List.Item className={prefix + "_dj_select"}>
                                <Form.Item>
                                    {getFieldDecorator('condolencesSituation', {
                                        initialValue: detailData && detailData.condolencesSituation,
                                        rules: [{required: true, message: '请输入慰问情况'}],
                                    })(
                                        <TextareaItem
                                            title={getInputItemTitle("慰问情况")}
                                            placeholder="请输入慰问情况"
                                            clear
                                            rows={3}
                                        />
                                    )}
                                </Form.Item>
                            </List.Item>
                            <List.Item className={prefix + "_dj_select"}>
                                <Form.Item>
                                    {getFieldDecorator('suggestions', {
                                        initialValue: detailData && detailData.suggestions,
                                        rules: [{required: true, message: '请输入意见建议'}],
                                    })(
                                        <TextareaItem
                                            title={getInputItemTitle("意见建议")}
                                            placeholder="请输入意见建议"
                                            clear
                                            rows={3}
                                        />
                                    )}
                                </Form.Item>
                            </List.Item>

                        </List>
                        <WhiteSpace size="lg"/>
                        <List>
                            <List.Item className={prefix + "_dj_image"}>
                                <span style={{color: "red", verticalAlign: "middle"}}>*</span>&nbsp;关怀展示
                                <span className={prefix + "_dj_image_tip"}>最多可上传5张</span>
                            </List.Item>
                            <Form.Item>
                                <ImagePicker
                                    files={files}
                                    onChange={this.imagePickerChange}
                                    selectable={files.length < 5}
                                    multiple={true}
                                    length="1"
                                />
                            </Form.Item>
                        </List>
                        <CommitFooterbar commit={this.handleCommit}/>
                    </Form>
                    <PersonModal
                        visible={personModal}
                        defaultCheckValues={isUpdate ?
                            (workerIds.length ? workerIds.join(",") : "") :
                            (detailData && detailData.workerIds ? detailData.workerIds : "")
                        }
                        onClose={() => this.onClose('personModal')()}
                        module={module}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownprops) => {
    return {
        unitId: state.userinfo.unitId,
        objectData: state.condolationObject,
        objectChange: state.condolationObjectChange,
    }
};


const Register = Form.create({name: 'zdjjrww_dj'})(RegisterConn);
export default connect(mapStateToProps, null)(withRouter(Register));
