import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {
    SearchBar, Accordion, List, Toast, InputItem, Button, WhiteSpace,
    DatePicker, TextareaItem, Picker, ImagePicker, Flex
} from 'antd-mobile';

import 'antd/es/icon/style';
import 'antd/es/avatar/style';
import EditTopbar from "../components/editTopbar";
import noAuth from '../../../util/noAuth';
import commonUrl from '../../../config';
import {registerPath} from "./resources";

import '../style/consolation.less';
import {prefix} from "../prefix";
const test = "http://127.0.0.1:8088";

class DetailConn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datasource: "",
            files: [],
            detailData: undefined
        }
    }

    componentWillMount() {
        const detid = this.props.location.pathname.split('/')[2];
        Toast.loading('Loading...', 0);
        axios.post(`${test}/app/condolences/findCondolencesDetail.do`, {id: detid}).then(
            res => {
                noAuth(res.data, () => this.props.history.push('/login'));
                if (res.data.code === 'success') {
                    let detailData = res.data.data;
                    this.setState({detailData: detailData});
                    Toast.hide();
                } else {
                    Toast.hide();
                    Toast.fail(res.data.message)
                }
            }
        );
    }


    goEdit = () => {
        const detid = this.props.location.pathname.split('/')[2];
        this.props.history.push(`/${registerPath}/${detid}`);
    };


    render() {
        const { detailData} = this.state;
        return (
            <div className={prefix}>
                <EditTopbar title="住院慰问登记"
                            onClick={() => this.props.history.goBack()}
                            onClickEdit={this.goEdit}
                />
                <div className={prefix + "-detail-box"}>
                    <div className={prefix + "_detail"}>

                        <List>
                            <List.Item>
                                <TextareaItem
                                    value={ detailData && detailData.name}
                                    title="慰问对象"
                                    editable={false}
                                />
                            </List.Item>

                            <List.Item>
                                <TextareaItem
                                    value={ detailData && detailData.condolencesUnit}
                                    title="慰问单位"
                                    editable={false}
                                />
                            </List.Item>
                            {/*  condolencesTime*/}
                            <List.Item>
                                <TextareaItem
                                    value={ detailData && detailData.condolencesTime}
                                    title="慰问时间"
                                    editable={false}
                                />
                            </List.Item>
                        </List>
                        <WhiteSpace size="lg"/>
                        <List>
                            <List.Item>
                                <TextareaItem
                                    value={ detailData && detailData.visitingHospital}
                                    title="就诊医院"
                                    editable={false}
                                />
                            </List.Item>
                            <List.Item>
                                <TextareaItem
                                    value={ detailData && detailData.sickTime}
                                    title="生病时间"
                                    editable={false}
                                />
                            </List.Item>
                            <List.Item>
                                <TextareaItem
                                    value={ detailData && detailData.sickType}
                                    title="生病类型"
                                    editable={false}
                                />
                            </List.Item>
                            <List.Item>
                                <TextareaItem
                                    value={ detailData && detailData.sickReason}
                                    title="生病原因"
                                    editable={false}
                                />
                            </List.Item>
                            <List.Item>
                                <TextareaItem
                                    value={ detailData && detailData.hospitalizedTime}
                                    title="住院时间"
                                    editable={false}
                                />
                            </List.Item>
                            <List.Item>
                                <TextareaItem
                                    value={ detailData && detailData.hospitalizedRecord}
                                    title="住院记录"
                                    editable={false}
                                />
                            </List.Item>
                            <List.Item>
                                <TextareaItem
                                    value={(detailData && detailData.isRehabilitation) ? "是" : "否"}
                                    title="是否康复"
                                    editable={false}
                                />
                            </List.Item>
                            <List.Item>
                                <TextareaItem
                                    value={detailData && detailData.remark}
                                    title={"备注"}
                                    rows={3}
                                    editable={false}
                                />
                            </List.Item>
                        </List>
                        <WhiteSpace size="lg"/>
                        <List>
                            <List.Item>
                                <TextareaItem

                                    value={ detailData && detailData.condolencesPerson}
                                    title="慰问人员"
                                    editable={false}
                                />
                            </List.Item>
                            <List.Item>
                                <TextareaItem
                                    title="慰问情况"
                                    rows={3}
                                    editable={false}
                                    value={ detailData && detailData.condolencesSituation}
                                />
                            </List.Item>
                            <List.Item>
                                <TextareaItem
                                    title="意见建议"
                                    rows={3}
                                    editable={false}
                                    value={ detailData && detailData.suggestions}
                                />
                            </List.Item>
                        </List>
                        <WhiteSpace size="lg"/>
                        <List>
                            <List.Item className={prefix + "_dj_image"}>
                                关怀展示
                            </List.Item>
                            <ImagePicker
                                files={detailData && detailData.imagePicker?detailData.imagePicker:[]}
                                selectable={false}
                                multiple={true}
                                length="1"
                            />
                        </List>
                    </div>

                </div>
            </div>
        );
    }
}

export default connect(null, null)(withRouter(DetailConn));