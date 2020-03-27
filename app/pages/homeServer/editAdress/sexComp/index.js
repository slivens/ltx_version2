import React, { Component } from 'react';
import classnames from 'classnames';
export default ({ checked, name, onChange }) => {
    return (
        
            <div onClick={onChange} className={classnames("sex-tag",checked?"sex-tag-active":"sex-tag-normal")}>
                <div className="am-tag-text">{name}</div>
            </div>
        
    )
}