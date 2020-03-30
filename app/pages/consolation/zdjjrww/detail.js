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
import {caseData, zdjjrwwDetailInfoData} from "../components/data";
import EditTopbar from "../components/editTopbar";
import CommitFooterbar from "../components/commitFooterbar";
import commonUrl from '../../../config';

const prefix = "zdjjrww";

class ZywwRegisterConn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datasource: "",
            files: [],
            detailData: zdjjrwwDetailInfoData
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
        const {files, detailData} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={prefix}>
                <EditTopbar title="重大节假日慰问登记" onClick={() => this.props.history.goBack()}/>
                <Form className={prefix + "_detail"}>
                    <List>
                        <List.Item extra={detailData.wwdx}>慰问对象</List.Item>
                        <List.Item extra={detailData.wwdw}>慰问单位</List.Item>
                        <List.Item extra={detailData.wwsj}>慰问时间</List.Item>
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <List.Item extra={detailData.jjrlxText}>节假日类型</List.Item>
                        <List.Item extra={detailData.xbText}>性别</List.Item>
                        <List.Item extra={detailData.ygzdw}>原工作单位</List.Item>
                        <List.Item extra={detailData.cjgzsj}>参加工作时间</List.Item>
                        <List.Item extra={detailData.jtzz}>家庭住址</List.Item>
                        <TextareaItem
                            title="备注"
                            rows={3}
                            disabled
                            value={ detailData.bz}
                        />
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <List.Item extra={detailData.wwry}>慰问人员</List.Item>
                        <TextareaItem
                            title="慰问情况"
                            rows={3}
                            disabled
                            value={ detailData.wwqk}
                        />
                        <TextareaItem
                            title="意见建议"
                            rows={3}
                            disabled
                            autoHeight
                            value={ detailData.yjjy}
                        />
                    </List>
                    <WhiteSpace size="lg"/>
                    <List>
                        <InputItem
                            editable={false}
                            className={prefix + "_dj_image"}
                        >
                            关怀展示
                        </InputItem>

                        <ImagePicker
                            files={files}
                            onChange={this.imagePickerChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 5}
                            multiple={true}
                            length="1"
                        />
                    </List>
                    <CommitFooterbar commit={this.handleCommit}/>
                </Form>

            </div>
        );
    }
}

const ZywwRegister = withRouter(Form.create({name: 'zyww_dj'})(ZywwRegisterConn));
export default connect(null, null)(withRouter(ZywwRegister));