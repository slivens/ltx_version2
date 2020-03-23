import React, {Component} from 'react';
import './style/index.less';
import {Flex} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

const prefix = "ww_footerbar";

class AddFooterbar extends Component {

    goRegister = (registerPath) => {
        this.props.history.push(`/${registerPath}`)
    };

    render() {
        const {registerPath} = this.props;
        return (
            <div className={prefix} onClick={() => this.goRegister(registerPath)}>
                新增记录
            </div>
        );
    }
}
export default withRouter(AddFooterbar);