
import React, { Component } from 'react';
import Icon from 'antd/es/icon';
import 'antd/es/icon/style';
import {withRouter} from 'react-router-dom';
const  detailBox=({title,children,rightText,history,member,actId})=>{
    return (
        <div className="detail-box">
            <div className="detail-box-bar">
                <span className="border-left"/>&nbsp;&nbsp;<span className="title">{title}</span>
                {
                    rightText&&<span onClick={()=>history.push({pathname:"/partyMember",params:member,actId})} style={{
                        position: "absolute",
                        right: ".1rem",
                        top: "50%",
                        color: "#e90e31",
                        fontSize: ".14rem",
                        transform: "translateY(-50%)"
                    }} >查看更多</span>
                }
            </div>
             <div className="detail-box-content">
             {children}
             </div>
        </div>
    )
}

export default withRouter(detailBox);
