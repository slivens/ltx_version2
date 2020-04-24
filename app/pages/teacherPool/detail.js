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
import DescriptionBox from '../../components/descriptionBox/descriptionBox';
import {detail} from './components/data';
import TurnFooterbar from './components/turnfooterbar';
/*import {detail, attachMentList} from './components/data';*/
import {prefix} from "./prefix";
const test = "http://127.0.0.1:8088";


class MessageNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
        };
    }

    componentWillMount() {
        this.fetchData()
    }

    fetchData = () => {
        const {pathname} = this.props.location;
        this.setState({detail: detail.data})
        // const msgId = pathname.split('/')[2];
        // const msgId = "4028c1e26fa1bc5a016fa1bee1900016";
        /*  const msgId = "40281f816f55b811016f55c9d9630017";
         axios.post(`${commonUrl}/app/msg/qryAppMsgDetail.do`, {msgId: msgId, msgType: "2"})
         .then(res => {
         noAuth(res.data, () => this.props.history.push('/login'));
         if (res.data.code === "success") {
         this.setState({detail: res.data.data})
         }
         })*/
    };

    componentDidMount() {

    }

    render() {
        const {detail, memberStatus} = this.state;
        const {pathname} = this.props.location;
        const actId = pathname.split('/')[2];
        return (
            <div className={prefix}>
                <Topbar title="师资详情" onClick={() => this.props.history.goBack()}/>
                正在开发中
                <DescriptionBox title={"教师简介"}>
                    <div className={prefix + "_detail_intro"}>
                        {detail.des}
                    </div>
                </DescriptionBox>
                <WhiteSpace />
                <DescriptionBox title={"主讲课题"}>
                    {detail.des}
                </DescriptionBox>
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
