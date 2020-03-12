/*
 * @Author: your name
 * @Date: 2019-09-02 11:14:20
 * @LastEditTime: 2019-11-22 14:48:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\pages\message\list.js
 */
import React, { Component } from 'react';
import Avatar from 'antd/es/avatar';
import 'antd/es/avatar/style';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import 'antd/es/col/style';
import 'antd/es/row/style';
import {Badge} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
const List = ({ children }) => {
    return (
        <div className="mesg_list">
            {children}
        </div>
    )
}

const Item = withRouter(({history,id, title, avatar, date, content, newMsgNum,createTime,params }) => {
    return (
        <div className="mesg_item" onClick={()=>history.push({pathname:"mesgsDetail",params:{title,id,params}})}>
            <Row style={{height:"100%"}} type="flex" align="middle">
                <Col span={4}>&nbsp;&nbsp;<Avatar icon="user" /></Col>
                <Col span={14}><div className="mesg_item_content">
                    <span className="title">{title}</span>
                    <div className="content">{content}</div>
                </div></Col>
                <Col span={6}><div className="mesg_item_right">
                    <div className="date">{date}</div>
                    <div className="count"><Badge text={newMsgNum} hot/></div>
                </div></Col>
            </Row>
        </div>
    )
})
List.Item = Item;

export default List;