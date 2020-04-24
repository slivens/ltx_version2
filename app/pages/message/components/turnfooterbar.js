import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Flex} from 'antd-mobile';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
const prefix = "mesNotice_footerbar";

class TurnFooterbar extends Component {

    state = {
        msgList: [],
        msgId: undefined,
        msgType: undefined,
    };

    componentWillMount() {
        //window.addEventListener('touchmove', func, { passive: false })
        this.setState({
            msgList: this.props.msgList,
            msgId: this.props.msgId,
            msgType: this.props.msgType,
        })
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            msgList: nextProps.msgList,
            msgId: nextProps.msgId,
            msgType: nextProps.msgType,
        })
    }

    previousPage = () => {
        const {msgList, msgId, msgType} = this.state;
        const {history,location} = this.props;
        for (let index = 0; index < msgList.length; index++) {
            let fomatParams = JSON.parse(msgList[index].params);
            if (fomatParams.id === msgId) {
                let turnItem = index == 0 ? msgList[msgList.length - 1] : msgList[index - 1];
                let turnParams = JSON.parse(turnItem.params);
                this.props.fetchData(turnParams.id, msgType)
                history.replace({pathname: `/messageNotice/${turnParams.id}/${msgType}`, params: location.params || {}})
            }
        }
    };

    nextPage = () => {
        const {msgList, msgId, msgType} = this.state;
        const {history, location} = this.props;
        for (let index = 0; index < msgList.length; index++) {
            let fomatParams = JSON.parse(msgList[index].params);
            if (fomatParams.id === msgId) {
                let turnItem = index === msgList.length - 1 ? msgList[0] : msgList[index + 1];
                let turnParams = JSON.parse(turnItem.params);
                this.props.fetchData(turnParams.id, msgType);
                history.replace({pathname: `/messageNotice/${turnParams.id}/${msgType}`, params: location.params || {}})
            }
        }
    };

    render() {
        return (
            <div className={prefix}>
                <Flex style={{height: "100%"}} align="center" justify="center">
                    <Flex.Item>
                        <span onClick={this.previousPage}>
                             <Icon
                                 style={{
                                     position: "absolute",
                                     left: ".1rem",
                                     top: "50%",
                                     fontSize: ".24rem",
                                     transform: "translateY(-50%)",
                                     color: "#f02933"
                                 }} type="left"/>
                        <span className={prefix + "_left_text"}>上一页</span>
                        </span>

                    </Flex.Item>
                    <Flex.Item>
                        <span onClick={this.nextPage}>
                            <span className={prefix + "_right_text"}> 下一页</span>
                            <Icon
                                style={{
                                    position: "absolute",
                                    right: ".1rem",
                                    top: "50%",
                                    fontSize: ".24rem",
                                    transform: "translateY(-50%)",
                                    color: "#f02933"
                                }} type="right"/>
                        </span>
                    </Flex.Item>
                </Flex>
            </div>

        );
    }
}
export default withRouter(TurnFooterbar);