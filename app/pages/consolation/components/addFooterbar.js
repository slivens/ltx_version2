import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Icon from '../../../components/icon';

import './style/index.less';
const prefix = "ww_footerbar";

class AddFooterbar extends Component {

    goRegister = (registerPath) => {
        this.props.history.push(`/${registerPath}`)
    };

    render() {
        const {registerPath} = this.props;
        return (
            <div className={prefix} onClick={() => this.goRegister(registerPath)}>
                <Icon className={prefix + "_icon"} type="tianjia-" theme="filled"/>
                新增记录
            </div>
        );
    }
}
export default withRouter(AddFooterbar);