import React, { Component } from 'react';
import './style/index.less';
export default ({title,content}) => {
    return (
        <div className="order_item">
            <div className="order_item_label">{title}</div>
            <div className="order_item_content">{content}</div>
        </div>
    )
}