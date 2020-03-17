import React, { Component } from 'react';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import './style/index.less';
export default ({item,onClick})=>{
    console.log(item)
    return(
    <WingBlank size="lg" >
                            <WhiteSpace size="lg" />
                            <div className="conmon_card" onClick={onClick}>
                                <img src={item.imgPath}/>
                                <div className="conmon_card_title">{item.title}</div>
                                <div className="conmon_card_content">{item.content}</div>
                            </div>
                    <WhiteSpace size="lg" />
                        </WingBlank>
    )
}