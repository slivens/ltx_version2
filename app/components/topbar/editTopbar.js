import React, {Component} from 'react';
import Icon from 'antd/es/icon';
import './style/index.less';
export default ({title, onClick,onClickEdit}) => {
    return (
        <div className="topbar">
            <Icon
                onClick={onClick}
                style={{
                    position: "absolute",
                    left: ".1rem",
                    top: "50%",
                    color: "#F7F8F4",
                    fontSize: ".24rem",
                    transform: "translateY(-50%)"
                }} type="left"/>
            <div >{title}</div>
            <div className="topbar_right" style={{fontSize: ".18rem"}} onClick={onClickEdit}>编辑</div>
        </div>
    )
}

