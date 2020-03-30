import React, {Component} from 'react';
import './style/index.less';
import {withRouter} from 'react-router-dom';
import {Button, Flex} from 'antd-mobile';
const prefix = "ww_footerbar";

class CommitFooterbar extends Component {
    render() {
        const {commit} = this.props;
        return (
            <div className={prefix} onClick={commit}>
                <Flex style={{height: "100%"}} align="center" justify="center">
                    <Button style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        width: "2.8rem",
                        margin: "0 auto",
                        color: "#fff",
                        background: "#F5432F",
                        // marginLeft:".1rem"
                    }}>提交</Button>
                </Flex>
            </div>

        );
    }
}
export default withRouter(CommitFooterbar);