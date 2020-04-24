import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import Icon from 'antd/es/icon';
import Empty from 'antd/es/empty';
import 'antd/es/icon/style';
import 'antd/es/empty/style';
import './style/index.less';
import {Button, WhiteSpace, Flex, Toast, List} from 'antd-mobile';
import axios from 'axios';
import commonUrl from '../../config';
import {connect} from 'react-redux';
import noAuth from '../../util/noAuth';
import Topbar from '../../components/topbar/topbar';
import DescriptionBox from '../../components/descriptionBox/descriptionBox';
import TurnFooterbar from './components/turnfooterbar';
import {detail, attachMentList} from './data';

const test = "http://127.0.0.1:8088";

const prefix = "mesNotice";
const NUM_ROWS = 0x7fffffff;
const pIndex = 1;


class MessageNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: undefined,
            errorMessage: undefined,
            msgList: undefined,
            msgId: undefined,
            msgType: undefined
        };
    }

    componentWillMount() {
        const {pathname} = this.props.location;
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
                    this.setState({detail: res.data.data, msgId, msgType})
                } else {
                    this.setState({errorMessage: res.data.message})
                }
            })
    };

    fetchMsgList = () => {
        const {pathname} = this.props.location;
        const msgType = pathname.split('/')[3];
        let requestParams = {pageNumber: pIndex, pageSize: NUM_ROWS, msgType: msgType};
        axios.post(`${commonUrl}/app/msg/qryMsgRecordPageList.do`, requestParams)
            .then(res => {
                noAuth(res.data, () => history.push('/login'));
                if (res.data.code === 'success') {
                    this.setState({msgList: res.data.data.result})
                }
            })
    };

    downloadFile = (event, item) => {
        /* let aLink = document.createElement('a');
         let blob = new Blob([item.attachmentUrl]);
         let evt = document.createEvent("HTMLEvents");
         evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
         aLink.download = item.attachmentName;
         aLink.href = URL.createObjectURL(blob);
         aLink.dispatchEvent(evt);*/
        event.preventDefault();
        event.stopPropagation();
        //开启loading 按钮置灰
        this.setState({
            loadingStatus: false,
            buttonDisabled: true,
        });
        axios.get(item.attachmentUrl)
            .then(res => {

                res.blob().then(blob => {
                    //关闭loading 按钮恢复正常
                    let blobUrl = window.URL.createObjectURL(blob);
                    const filename = times.formatNowDate() + '.zip';
                    const aElement = document.createElement('a');
                    document.body.appendChild(aElement);
                    aElement.style.display = 'none';
                    aElement.href = blobUrl;
                    aElement.download = filename;
                    aElement.click();
                    document.body.removeChild(aElement);
                });
            })
        /* fetch(, {
         method: 'get',
         credentials: 'include',
         headers: new Headers({
         'Content-Type': 'application/json',
         'X-Auth-Token': User.getToken(),
         }),
         }).then((response) => {

         }).catch((error) => {
         //关闭loading 按钮恢复正常
         this.setState({
         loadingStatus: false,
         buttonDisabled: false,
         });
         console.log('文件下载失败', error);
         });*/
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
        const {history, location} = this.props;
       // localStorage.setItem("messageNotice", JSON.stringify(this.props.location.params));
        history.push({pathname: "/mesgsDetail", params: location.params})
    };

    render() {
        const {detail, errorMessage, msgList, msgId, msgType} = this.state;
        /* const {history, location} = this.props;
         const {params} = location;
         console.log(params)*/
        const {pathname} = this.props.location;
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
                                           fetchData={this.fetchData}/>
                        </div>
                    ) : <Empty description={errorMessage}/>
                }
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    userId: state.userinfo.id
});
const mapdispatchToProps = (dispatch, ownProps) => {
    return {}
};
export default connect(mapStateToProps, mapdispatchToProps)(withRouter(MessageNotice));
