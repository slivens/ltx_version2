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
import {caseData, zywwDetailInfoData} from "../components/data";
import Topbar from "../components/topbar";
import CommitFooterbar from "../components/commitFooterbar";
import PersonModal from "../components/personModal";
import UnitModal from "../components/unitModal";
import {
    formatDate, formatCustomSelectDate, getInputItemTitle, getEditClassName
} from "../utils/utils";
import commonUrl from '../../../config';
import '../style/consolation.less';
import {prefix} from "../prefix";


class RegisterConn extends Component {
    constructor(props) {
        super(props);
        this.personModalElement = React.createRef();
        this.state = {
            files: [],
            detailData: undefined,
            personModal: false,
            unitModal: false,
        };
    }

    componentWillMount() {
        const {unitId} = this.props;
        const detid = this.props.location.pathname.split('/')[2];
        Toast.loading('Loading...', 0);
        axios.post(`${commonUrl}/app/condolences/findCondolencesDetail.do`, {id: detid}).then(
            res => {
                if (res.data.code === 'success') {
                    this.setState({detailData: res.data.data});
                    Toast.hide();
                } else {
                    Toast.hide();
                    Toast.fail(res.data.message)
                }
            }
        );
    }

    imagePickerChange = (files, type, index) => {
        this.setState({files});
        if (files.length) {
            let formData = new FormData();
            formData.append('imgFile', files[0].url);
            let config = {headers: {'Content-Type': 'multipart/form-data'}};
            axios.post(`${commonUrl}/app/condolences/uploadCondolencesImg.do`, formData, config)
                .then(res => {
                    if (res.data.code === 'success') {
                        // this.resImgName = res.data.data;
                        Toast.success('图片上传成功')
                    } else {
                        Toast.fail(`图片上传失败：${res.message}`)
                    }
                })
        }
    };

    handleCommit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const {objectData, unitData} = this.props;
                const objects = objectData.filter(item => item.checked);
                let objectIds = [];
                if (objects.length) {
                    objects.forEach(item => {
                        objectIds.push(item.value)
                    })
                }

                const units = unitData.filter(item => item.checked);
                let unitIds = [];
                if (units.length) {
                    units.forEach(item => {
                        unitIds.push(item.value)
                    })
                }
                const params = {
                    ...values,
                    userIds: objectId.join(),
                    condolencesType: "1",
                    isRehabilitation: values.isRehabilitation[0]
                };
                values.id = null;
                // values.resImgName =this.resImgName
                axios.post(`${commonUrl}/app/condolences/saveCondolencesInfo.do`, params)
                    .then(res => {
                        if (res.data.code === "success") {
                            clearTimeout(this.timer);
                            Toast.success('提交成功', 1, () => this.timer = setTimeout(this.props.history.push('/zyww'), 2000));
                        } else {
                            Toast.fail(`提交失败：${res.data.message}`, 2)
                        }
                    }).catch((err) => {
                    Toast.fail(`提交失败：${err}`, 2)
                })
            }
        });
    };

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    };

    render() {
        const {files, detailData, personModal, unitModal} = this.state;
        const {getFieldDecorator} = this.props.form;
        const {objectData, unitData} = this.props;

        const showObject = objectData.filter(item => item.checked);
        let names = [];
        if (showObject.length) {
            showObject.forEach(item => {
                names.push(item.label)
            })
        }

        const showUnit = unitData.filter(item => item.checked);
        let units = [];
        if (showUnit.length) {
            showUnit.forEach(item => {
                units.push(item.label)
            })
        }

        return (
            <div className={prefix}>
                <Topbar title="住院慰问登记" onClick={() => this.props.history.goBack()}/>

                <div className={prefix + "-register-box"}>

                    <Form className={prefix + "_dj"}>
                        <List>
                            <List.Item className={prefix + "_dj_select"} arrow="horizontal">
                                <Form.Item>
                                    {getFieldDecorator('name', {
                                        initialValue: formatCustomSelectDate(detailData, "name", names),
                                        rules: [{required: true, message: '请选择慰问对象'}],
                                    })(
                                        <InputItem
                                            placeholder="请选择慰问对象"
                                            clear
                                            onClick={() => this.setState({personModal: true})}
                                        >
                                            {getInputItemTitle("慰问对象")}
                                        </InputItem>
                                    )}
                                </Form.Item>
                            </List.Item>
                            <List.Item className={prefix + "_dj_select"} arrow="horizontal">
                                <Form.Item>
                                    {getFieldDecorator('condolencesUnit', {
                                        initialValue: formatCustomSelectDate(detailData, "condolencesUnit", units),
                                        rules: [{required: true, message: '请选择慰问单位'}],
                                    })(
                                        <InputItem
                                            placeholder="请选择慰问单位"
                                            clear
                                            onClick={() => this.setState({unitModal: true})}
                                        >
                                            {getInputItemTitle("慰问单位")}
                                        </InputItem>
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
                            <List.Item className={prefix + "_dj_select"}>
                                <Form.Item>
                                    {getFieldDecorator('visitingHospital', {
                                        initialValue: detailData && detailData.visitingHospital,
                                        rules: [{required: true, message: '请输入就诊医院'}],
                                    })(
                                        <InputItem
                                            placeholder="请输入就诊医院"
                                            clear
                                        >  {getInputItemTitle("就诊医院")}</InputItem>
                                    )}
                                </Form.Item>
                            </List.Item>

                            <List.Item arrow="horizontal">
                                <Form.Item>
                                    {getFieldDecorator('sickTime', {
                                        initialValue: formatDate(detailData, "sickTime"),
                                        rules: [{required: true, message: '请选择生病时间'}],
                                    })(
                                        <DatePicker
                                            mode="date"
                                            title="生病时间"
                                            extra="请选择生病时间"
                                        >
                                            <List.Item
                                                className={prefix + "_dj_picker " + getEditClassName(detailData, "sickTime")}
                                            >
                                                {getInputItemTitle("生病时间")}
                                            </List.Item>
                                        </DatePicker>
                                    )}
                                </Form.Item>
                            </List.Item>


                            <List.Item className={prefix + "_dj_select"}>
                                <Form.Item>
                                    {getFieldDecorator('sickType', {
                                        initialValue: detailData && detailData.sickType,
                                        rules: [{required: true, message: '请输入生病类型'}],
                                    })(
                                        <InputItem
                                            placeholder="请输入生病类型"
                                            clear
                                        >
                                            {getInputItemTitle("生病类型")}
                                        </InputItem>
                                    )}
                                </Form.Item>
                            </List.Item>


                            <List.Item className={prefix + "_dj_select"}>
                                <Form.Item>
                                    {getFieldDecorator('sickReason', {
                                        initialValue: detailData && detailData.sickReason,
                                        rules: [{required: true, message: '请输入生病原因'}],
                                    })(<InputItem
                                            placeholder="请输入生病原因"
                                            clear
                                        >
                                            {getInputItemTitle("生病原因")}
                                        </InputItem>
                                    )}
                                </Form.Item>
                            </List.Item>

                            <List.Item arrow="horizontal">
                                <Form.Item>
                                    {getFieldDecorator('hospitalizedTime', {
                                        initialValue: formatDate(detailData, "hospitalizedTime"),
                                        rules: [{required: true, message: '请选择住院时间'}],
                                    })(
                                        <DatePicker
                                            mode="date"
                                            title="住院时间"
                                            extra="请选择住院时间"
                                        >
                                            <List.Item
                                                className={prefix + "_dj_picker " + getEditClassName(detailData, "hospitalizedTime")}
                                            >
                                                {getInputItemTitle("住院时间")}
                                            </List.Item>
                                        </DatePicker>
                                    )}
                                </Form.Item>
                            </List.Item>

                            <List.Item className={prefix + "_dj_select"}>
                                <Form.Item>
                                    {getFieldDecorator('hospitalizedRecord', {
                                        initialValue: detailData && detailData.hospitalizedRecord,
                                        rules: [{required: true, message: '请输入住院记录'}],
                                    })(
                                        <InputItem
                                            placeholder="请输入住院记录"
                                            clear
                                        >
                                            {getInputItemTitle("住院记录")}
                                        </InputItem>
                                    )}
                                </Form.Item>

                            </List.Item>


                            <List.Item arrow="horizontal">
                                <Form.Item>
                                    {getFieldDecorator('isRehabilitation', {
                                        initialValue: [detailData && detailData.isRehabilitation],
                                        rules: [{required: true, message: '请选择是否康复'}],
                                    })(
                                        <Picker
                                            title="是否康复"
                                            extra="请选择是否康复"
                                            data={caseData}
                                            cols={1}>
                                            <List.Item
                                                className={prefix + "_dj_picker " + getEditClassName(detailData, "isRehabilitation")}
                                            >
                                                {getInputItemTitle("是否康复")}
                                            </List.Item>
                                        </Picker>
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
                            <List.Item className={prefix + "_dj_select"}>
                                <Form.Item>
                                    {getFieldDecorator('condolencesPerson', {
                                        initialValue: detailData && detailData.condolencesPerson,
                                        rules: [{required: true, message: '请输入慰问人员'}],
                                    })(
                                        <InputItem
                                            placeholder="请输入慰问人员"
                                            clear
                                        >{getInputItemTitle("慰问人员")}</InputItem>
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
                                    onImageClick={(index, fs) => console.log(index, fs)}
                                    selectable={files.length < 5}
                                    multiple={true}
                                    length="1"
                                >
                                    关怀展示
                                </ImagePicker>
                            </Form.Item>
                        </List>
                        <CommitFooterbar commit={this.handleCommit}/>
                    </Form>
                    <PersonModal visible={personModal} onClose={() => this.onClose('personModal')()}/>
                    <UnitModal visible={unitModal} onClose={() => this.onClose('unitModal')()}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownprops) => {
    return {
        userinfo: state.userinfo,
        objectData: state.condolationObject,
        unitData: state.condolationUnit
    }
};

const Register = Form.create({name: 'zyww_dj'})(RegisterConn);
export default connect(mapStateToProps, null)(withRouter(Register));
