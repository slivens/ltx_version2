import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Flex} from 'antd-mobile';
import './style/index.less';
const prefix = "ww_footerbar";

class ConfirmFooterbar extends Component {
    render() {
        const {confirm} = this.props;
        return (
            <div className={prefix} onClick={confirm}>
                <Flex style={{height: "100%"}} align="center" justify="center">
                    <Button style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        width: "2.8rem",
                        margin: "0 auto",
                        color: "#fff",
                        background: "#F5432F",
                        // marginLeft:".1rem"
                    }}>确定</Button>
                </Flex>
            </div>

        );
    }
}
export default withRouter(ConfirmFooterbar);