import React, {Component} from 'react';
import './style/index.less';
import {Flex} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {List, TextareaItem, Button, Toast} from 'antd-mobile';
const prefix = "ww_footerbar";

class CommitFooterbar extends Component {
    render() {
        const {commit} = this.props;
        return (
            <div className={prefix} onClick={commit}>
                <Button className={prefix + "_commit_button"} >提交</Button>
            </div>

        );
    }
}
export default withRouter(CommitFooterbar);