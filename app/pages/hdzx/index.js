/*
 * @Author: your name
 * @Date: 2019-11-26 19:28:27
 * @LastEditTime: 2019-12-12 16:53:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\hdzx\index.js
 */
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import ConmonCard from '../../components/conmonCard';
import {connect} from 'react-redux';
import axios from 'axios';
import commonUrl from '../../config';

class Lnb extends Component {
    state={
        menudadta:[]
    }
    gowhere=(path)=>{
        this.props.history.push(path)
    }
    componentWillMount(){
        this.setState({menudadta:this.props.menudata})
        
    }
    render() {
        return (
            <div className="hdzx">
                <div className="hdzx_topbar">
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
                    活动中心</div>
                    <div className="hdzx_entry">
                {
                    this.state.menudadta.map((item, index) =>
                    <ConmonCard
                        item={item}
                        key={index}
                        onClick={()=>this.gowhere(item.path)}
                    />
                    )
                }
                    </div>
            </div>
        );
    }
}

const mapStateToProps=(state,ownprops)=>({
    menudata:state.menuData
})
const LnbComp=withRouter(Lnb)
export default connect(mapStateToProps,null)(LnbComp);