/*
 * @Author: Sliven
 * @Date: 2020-04-23 13:30:26
 * @LastEditors: Sliven
 * @LastEditTime: 2020-04-30 17:18:30
 * @Description: the code is written by Sliven
 */

import React, { Component } from 'react'
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import {withRouter} from 'react-router-dom';
class secret extends Component {
    state = {  }
    render() {
        return (
            <div className="secret">
            <div className="secret_topbar">
                <Icon
                    onClick={() => this.props.history.goBack()}
                    style={{
                        position: "absolute",
                        left: ".1rem",
                        top: "50%",
                        color: "#F7F8F4",
                        fontSize: ".24rem",
                        transform: "translateY(-50%)"
                    }} type="left" />
                用户协议</div>
                <iframe style={{height:"calc(100% - .6rem)",width:"100%"}}
                 src="http://220.160.52.124:8080/app/agreement.html "></iframe>
                </div>
        );
    }
}

export default withRouter(secret);