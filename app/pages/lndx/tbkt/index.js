import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
class index extends Component {
    render() {
        return (
            <div className="lndx_tbkt">
                <div className="lndx_tbkt_topbar">
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
                    同步课堂</div>
                <iframe style={{
                    width:'100%',
                    height:"calc(100% - .6rem)"
                }} src={`http://new.wx.fj.mihua.tv/tbkt/index.html`}/>
            </div>
        );
    }
}

export default withRouter(index);