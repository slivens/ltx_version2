import React, { Component } from 'react';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import './style/index.less';
export default ({item,onClick})=>{
    return(
                        <WingBlank size="lg" >
                            <WhiteSpace size="lg" />
                            <div className="zzfw_card" onClick={onClick}>
                                <img src={item.imgPath}/>
                                <div className="zzfw_card_box">
                                    <div className="zzfw_card_title">{item.title}</div>
                                    <div className="zzfw_card_content">{item.content}</div>
                                </div>
                            </div>
                        <WhiteSpace size="lg" />
                        </WingBlank>
    )
}