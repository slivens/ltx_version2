import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {List} from 'antd-mobile';
import './style/index.less';
const prefix = "teacherPool_des_box";

class DescriptionBox extends Component {
    render() {
        const {title, content, files,children} = this.props;
        return (
            <div className={prefix}>
                <div className={prefix + "_bar"}>
                    <div>
                        <span className="border-left"/>&nbsp;&nbsp;<span className="title">{title}</span>
                    </div>
                </div>
                {children}
            </div>

        );
    }
}
export default withRouter(DescriptionBox);

