import React, {Component} from 'react';
import {prefix} from "../prefix";

const arrayToString = (array) => {
    return array.length ? array.join('、') : "";
};

const formatDate = (info, key) => {
    return info && info[key] ? new Date(info[key]) : ""
};

const formatCustomSelectDate = (info, key, value) => {
    return info && info[key] ? info[key] : arrayToString(value)
};

const getInputItemTitle = text => {
    return (
        <div >
            <span style={{color: "red", verticalAlign: "middle"}}>*</span>&nbsp;
            <span>{text}</span>
        </div>
    )
};

const getEditClassName = (info, key) => {
    return info && info[key] != null ? `${prefix}_dj_picker_edit` : ""
};

export {
    arrayToString,
    formatDate,
    formatCustomSelectDate,
    getInputItemTitle,
    getEditClassName,
}