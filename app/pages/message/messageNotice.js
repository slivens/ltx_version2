import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import './style/index.less';
import {Button, WhiteSpace, Flex, Toast, List} from 'antd-mobile';
import axios from 'axios';
import commonUrl from '../../config';
import {connect} from 'react-redux';
import noAuth from '../../util/noAuth';
import Topbar from '../../components/topbar/topbar';
import DescriptionBox from '../../components/descriptionBox/descriptionBox';
import TurnFooterbar from './components/turnfooterbar';

const test = "http://192.168.137.1:8088";

let dataBlobs = [];
const prefix = "mesNotice";
const NUM_ROWS = 5;

class MessageNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: undefined,
            msgList: undefined,
            msgId: undefined,
            msgType: undefined,

            clicked1: 'none',
            isFinished: false
        };
    }

    componentWillMount() {
        const {pathname} = this.props.location;
        if (this.props.location.params) {
            localStorage.setItem("messageNotice", JSON.stringify(this.props.location.params));
        }
        const msgId = pathname.split('/')[2];
        const msgType = pathname.split('/')[3];
        this.fetchData(msgId, msgType);
        this.fetchMsgList();
    }

    fetchData = (msgId, msgType) => {

        axios.post(`${commonUrl}/app/msg/qryAppMsgDetail.do`, {msgId: msgId, msgType: msgType})
            .then(res => {
                noAuth(res.data, () => this.props.history.push('/login'));
                if (res.data.code === "success") {
                    //todo 消息已读取的id不对，接口要改
                    this.readInfo(res.data.data.recordId);
                    this.setState({detail: res.data.data, msgId, msgType})
                } else {
                    Toast.fail(res.data.message);
                }
            })
    };

    fetchMsgList = (pIndex = 1) => {
        const {pathname} = this.props.location;
        const msgType = pathname.split('/')[3];
        let requestParams = {pageNumber: pIndex, pageSize: NUM_ROWS, msgType: msgType};
        axios.post(`${commonUrl}/app/msg/qryMsgRecordPageList.do`, requestParams)
            .then(res => {
                noAuth(res.data, () => history.push('/login'));
                if (res.data.code === 'success') {
                    if (res.data.data.result.length === 0) {
                        this.setState({isFinished: true})
                    } else {
                        this.renderDataBlobs(res.data.data.result);
                        this.setState({msgList: dataBlobs})
                    }

                }
            })
    };

    renderDataBlobs = (data) => {
        dataBlobs = dataBlobs.concat(data)
    };

    readInfo = (recordId) => {
        axios.post(`${commonUrl}/app/readMsgRecord.do`, {userId: this.props.userId, recordId: recordId})
            .then(res => {
                noAuth(res.data, () => this.props.history.push('/login'));
                if (res.data.code === 'success') {
                }
            })
    };


    downloadFile = (event, item) => {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
            let filename = item.attachmentName;
            let filepath = item.attachmentUrl;

            if (window.plus) {//支持plus
                //判断文件是否已经下载
                try {
                    plus.io.resolveLocalFileSystemURL(
                        '_downloads/' + filename,
                        function (entry) {//如果已存在文件，则打开文件
                            if (entry.isFile) {
                                plus.runtime.openFile('_downloads/' + filename);
                            }
                        }, function () {//如果未下载文件，则下载后打开文件
                            var dtask = plus.downloader.createDownload(filepath, {filename: '_downloads/' + filename}, function (d, status) {
                                if (status == 200) {
                                    plus.runtime.openFile('_downloads/' + filename);
                                } else {
                                    Toast.error("下载失败: " + status);
                                }
                            });
                            dtask.addEventListener("statechanged", function (task, status) {
                                if (!dtask) {
                                    return;
                                }
                                switch (task.state) {
                                    case 1:
                                        Toast.success("开始下载...", 1);
                                        break;
                                    case 2:
                                        Toast.success("正在下载...", 1);
                                        break;
                                    case 4:
                                        dtask = null;
                                        break;
                                }
                            });
                            dtask.start();
                        }
                    );
                } catch (plusError) {
                    console.log('该浏览器不支持plus')
                }
            } else {//不支持plus
                window.open(filepath);
            }
        } else {
            let src = item.attachmentUrl;
            let iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = "javascript: '<script>location.href=\"" + src + "\"<\/script>'";
            document.getElementsByTagName('body')[0].appendChild(iframe);
        }
    };

    desContent = (attachMentList) => {
        return (
            <List className={prefix + "_des_box_bottom"}>
                {
                    attachMentList.map((item, index) => (
                            <List.Item arrow="horizontal" key={`mesNoticeList${index}`}
                                       onClick={(event) => this.downloadFile(event, item)}>
                                {item.attachmentName}
                            </List.Item>
                        )
                    )
                }
            </List>
        )
    };

    goBack = () => {
        this.props.history.goBack();
    };

    render() {
        const {detail, msgList, msgId, msgType, isFinished} = this.state;
        return (
            <div className={prefix}>
                <Topbar title="通知详情" onClick={this.goBack}/>
                {
                    detail ? (
                        <div className={prefix + "_content"}>
                            <div className={prefix + "_box"}>
                                <div className={prefix + "_box_title"}>{detail.title}</div>
                                <Flex>
                                    <Flex.Item>发布人：</Flex.Item>
                                    <Flex.Item>{detail.sendName}</Flex.Item>
                                </Flex>
                                <Flex>
                                    <Flex.Item>发布时间：</Flex.Item>
                                    <Flex.Item>{detail.createTime}</Flex.Item>
                                </Flex>
                                <Flex>
                                    <Flex.Item>附件：</Flex.Item>
                                    <Flex.Item>
                                        <div className="fileNames">{detail.fileNames}</div>
                                    </Flex.Item>
                                </Flex>
                                {/* <div className="pic"><img src={findOne.imgPath}/></div> */}
                                {/*  <div className="content" dangerouslySetInnerHTML={{__html: findOne.publicInfo}}></div>*/}
                            </div>
                            <WhiteSpace />
                            <DescriptionBox title={"正文"}>
                                <div className={prefix + "_des_box_content"}
                                     dangerouslySetInnerHTML={{__html: detail.content}}/>
                            </DescriptionBox>
                            <WhiteSpace />
                            {
                                detail && detail.attachMentList && detail.attachMentList.length ? (
                                    <div>
                                        <DescriptionBox title={"附件"}>
                                            { this.desContent(detail.attachMentList)}
                                        </DescriptionBox>
                                        <WhiteSpace />
                                    </div>
                                ) : ""
                            }
                            <TurnFooterbar msgList={msgList} msgId={msgId} msgType={msgType}
                                           isFinished={isFinished}
                                           fetchData={this.fetchData}
                                           fetchMsgList={this.fetchMsgList}/>
                        </div>
                    ) : ""
                }
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    userId: state.userinfo.id
});
export default connect(mapStateToProps, null)(withRouter(MessageNotice));
