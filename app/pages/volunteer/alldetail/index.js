import React, { Component } from 'react';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import './style/index.less';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import commonUrl from '../../../config';
import noAuth from '../../../util/noAuth';
class index extends Component {
    state={
        findOne:{}
    }
    componentWillMount() {
        axios.post(`${commonUrl}/app/qryNewsDetail.do`,{newsId:"general"})
        .then(res=>{
            noAuth.noAuthCode(res.data)
            if(res.data.code==='success'){
                this.setState({findOne:res.data.data})
            }
        })
    }
    render() {
        const {findOne} =this.state;
        return (
            <div className="volunteer_tell">
                <div className="volunteer_tell_topbar">
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
                    总体介绍</div>
                <div className="volunteer_tell_body">
                    <div className="title">{findOne.title}</div>
                    <div className="date">
                    <span>来源: {findOne.source}</span>&nbsp;&nbsp;<span>{findOne.publicDate}</span>
                    </div>
                    {/* <div className="pic"><img src={findOne.imgPath}/></div> */}
                    <div className="content" dangerouslySetInnerHTML={{__html:findOne.publicInfo}}></div>
                </div>
            </div>
        );
    }
}

export default withRouter(index);