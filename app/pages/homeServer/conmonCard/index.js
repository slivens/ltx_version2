import React, { Component } from 'react';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import {connect} from 'react-redux';
import './style/index.less';
import commonUrl from '../../../config/index';
const ServerItem= ({item,onClick})=>{
    return(
    <WingBlank size="lg" >
                            <WhiteSpace size="lg" />
                            <div className="zzfw_card" onClick={onClick}>
                                <img onError={(e) => {e.target.onerror = null;e.target.src=`${commonUrl}/app/getUploadImg.do?fn=default.jpg`}} src={item.companyLogo}/>
                                <div className="zzfw_card_box">
                                    <div className="zzfw_card_title">{item.companyName}</div>
                                    <div className="zzfw_card_content">{item.description}</div>
                                </div>
                            </div>
                    <WhiteSpace size="lg" />
                        </WingBlank>
    )
}

export default ServerItem;