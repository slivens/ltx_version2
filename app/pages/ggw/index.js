/*
 * @Author: Sliven
 * @Date: 2020-04-23 08:39:35
 * @LastEditors: Sliven
 * @LastEditTime: 2020-04-24 09:23:18
 * @Description: the code is written by Sliven
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import ConmonCard from '../../components/conmonCard';
import { connect } from 'react-redux';
import axios from 'axios';
import commonUrl from '../../config';
import {changeMenu,GGWTabs} from '../../redux/actions';
class index extends Component {
    state={
        menudata:[],
        menuid:this.props.location.params
    }
    gowhere=(path,item)=>{
            this.props.GGWTabs(item)
            this.props.history.push(path)
    }
    componentWillMount(){
        this.setState({menudadta:this.props.menudata})
    }
    render() {
        return (
            <div className="ggw">
                <div className="ggw_topbar">
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
                    关工委</div>
                <div className="ggw_entry">
                {
                    this.state.menudadta.map((item, index) =>
                    <ConmonCard
                        item={item}
                        key={index}
                        onClick={()=>this.gowhere(`/ggwView/${item.code}`,item)}
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
const mapDispatchToProps=(dispatch,ownprops)=>({
    fetchMenu:(data)=>dispatch(changeMenu(data)),
    GGWTabs:(item)=>dispatch(GGWTabs(item)),
})
const MyGgwComp=withRouter(index)
export default connect(mapStateToProps,mapDispatchToProps)(MyGgwComp);