import React, {Component} from 'react';
import './style/index.less';
import {Flex} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {List, TextareaItem, Button, Toast} from 'antd-mobile';
import commonUrl from '../../../config';
const prefix = "ww_footerbar";

class CommitFooterbar extends Component {
    /*  gowhere = (key) => {
     this.props.history.push(key)
     }*/

    goRegister = (registerPath) => {
       // this.props.history.push(`/${registerPath}`)
    };


    render() {
        const {history, location, registerPath,commit} = this.props;
        const path = location.pathname.split('/')[1];
        return (
            <div className={prefix} onClick={commit}>
                <Button className={prefix + "_commit_button"} >提交</Button>
            </div>

        );
    }
}
export default withRouter(CommitFooterbar);