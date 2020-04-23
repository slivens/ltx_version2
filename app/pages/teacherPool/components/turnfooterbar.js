import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Flex} from 'antd-mobile';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
const prefix = "mesNotice_footerbar";

class TurnFooterbar extends Component {
    render() {
        /* const {confirm} = this.props;*/
        return (
            <div className={prefix}>
                <Flex style={{height: "100%"}} align="center" justify="center">
                    <Flex.Item>
                        <Icon
                            style={{
                                position: "absolute",
                                left: ".1rem",
                                top: "50%",
                                color: "#bbb",
                                fontSize: ".24rem",
                                transform: "translateY(-50%)",
                                color: "#f02933"
                            }} type="left"/>
                        <span className={prefix + "_left_text"}>上一页</span>
                    </Flex.Item>
                    <Flex.Item>
                        <span className={prefix + "_right_text"}> 下一页</span>
                        <Icon
                            style={{
                                position: "absolute",
                                right: ".1rem",
                                top: "50%",
                                color: "#bbb",
                                fontSize: ".24rem",
                                transform: "translateY(-50%)",
                                color: "#f02933"
                            }} type="right"/>
                    </Flex.Item>
                </Flex>
            </div>

        );
    }
}
export default withRouter(TurnFooterbar);