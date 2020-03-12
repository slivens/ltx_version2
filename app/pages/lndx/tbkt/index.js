/*
 * @Author: your name
 * @Date: 2019-10-31 09:43:31
 * @LastEditTime: 2019-12-02 15:37:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\lndx\tbkt\index.js
 */
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
class index extends Component {
    constructor(props){
        super(props)
        this.tbkt=React.createRef();
    }
    componentDidMount(){
    //     console.log(this.tbkt.current.contentWindow.document)
    //     const iframe=this.tbkt.current.contentWindow;
    //     const win=iframe.document.getElementsByTagName('html')[0];
    //   console.log(win)
    }
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
                <iframe ref={this.tbkt} id="tbkt" style={{
                    width:'100%',
                    height:"calc(100% - .6rem)"
                }} src={`http://new.wx.fj.mihua.tv/tbkt/index.html`}/>
            </div>
        );
    }
}

export default withRouter(index);