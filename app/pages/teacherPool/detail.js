import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import {Button, WhiteSpace, Flex, Toast, List} from 'antd-mobile';
import axios from 'axios';
import commonUrl from '../../config';
import {connect} from 'react-redux';
import noAuth from '../../util/noAuth';
import Topbar from '../../components/topbar/topbar';
import DescriptionBox from './components/descriptionBox';
import TurnFooterbar from './components/turnfooterbar';
/*import {detail, attachMentList} from './components/data';*/

const test = "http://127.0.0.1:8088";

const prefix = "mesNotice";


class MessageNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            memberStatus: {},
        };
    }

    componentWillMount() {
        this.fetchData()
    }

    fetchData = () => {
        const {pathname} = this.props.location;
        // const msgId = pathname.split('/')[2];
        // const msgId = "4028c1e26fa1bc5a016fa1bee1900016";
        const msgId = "40281f816f55b811016f55c9d9630017";
        /*this.setState({detail: detail.data})*/
        axios.post(`${commonUrl}/app/msg/qryAppMsgDetail.do`, {msgId: msgId, msgType: "2"})
            .then(res => {
                noAuth(res.data, () => this.props.history.push('/login'));
                if (res.data.code === "success") {
                    this.setState({detail: res.data.data})
                }
            })
    };

    componentDidMount() {

    }

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
        axios.post(item.attachmentUrl)
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
    }

    render() {
        const {detail, memberStatus} = this.state;
        const {pathname} = this.props.location;
        const actId = pathname.split('/')[2];
        return (
            <div className={prefix}>
                <Topbar title="师资详情" onClick={() => this.props.history.goBack()}/>
                正在开发中
               {/* <div className={prefix + "_content"}>
                    <div className={prefix + "_box"}>
                        <div className={prefix + "_box_title"}>{detail.title}</div>
                        <Flex>
                            <Flex.Item>发布人：</Flex.Item>
                            <Flex.Item>{detail.sender}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>发布时间：</Flex.Item>
                            <Flex.Item>{detail.createTime}</Flex.Item>
                        </Flex>
                        <Flex>
                            <Flex.Item>附件：</Flex.Item>
                            <Flex.Item>{detail.fileName}</Flex.Item>
                        </Flex>
                         <div className="pic"><img src={findOne.imgPath}/></div>
                          <div className="content" dangerouslySetInnerHTML={{__html: findOne.publicInfo}}></div>
                    </div>
                    <WhiteSpace />
                    <DescriptionBox title={"正文"}
                                    content={<div className={prefix + "_des_box_content"}>{detail.content}</div>}
                    />
                    <WhiteSpace />
                    <DescriptionBox title={"附件"} content={
                        <List className={prefix + "_des_box_bottom"}>
                            {
                                attachMentList.map((item, index) => (
                                        <List.Item arrow="horizontal" onClick={(event) => this.downloadFile(event, item)}>
                                            {item.attachmentName}
                                        </List.Item>
                                    )
                                )
                            }
                        </List>
                    }/>
                    <WhiteSpace />
                    <TurnFooterbar/>
                </div>*/}
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
