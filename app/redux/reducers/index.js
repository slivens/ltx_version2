/*
 * @Author: your name
 * @Date: 2019-10-16 13:54:08
 * @LastEditTime: 2020-04-29 13:13:59
 * @LastEditors: Sliven
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\redux\reducers\index.js
 */

import { combineReducers } from "redux";
const userinfo = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_USER_INFO':
            return {
                ...state,
                ...action.info
            }
        default:
            return state
    }
}
const menuData = (state = [], action) => {
    switch (action.type) {
        case 'CHANGE_MENU':
            return [...action.data]
        default:
            return state
    }
}
const searchValue = (state = "", action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_VALUE':
            return action.value
        default:
            return state
    }
}
const serverCompany = (state = {}, action) => {
    switch (action.type) {
        case 'Add_HomeServer':
            return {
                ...action.company
            }
        case 'Select_HomeServer':
            return {
                ...state,
                selectList: action.select
            }
        case 'Add_OtherServer':
            return {
                ...state,
                otherserver: action.val
            }
        default:
            return state
    }
}
const address = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ADDRESS':
            return action.address
        default:
            return state
    }
}
const allMemberData = (state = [], action) => {
    switch (action.type) {
        case 'Add_AllMemberData':
            return action.memberData
        default:
            return state
    }
}

const condolationObject = (state = [], action) => {
    switch (action.type) {
        case 'Condolation_ObjectData':
            return {
                ...state,
                [action.module]: action.condolationObjectData
            };
        default:
            return state
    }
};

const condolationObjectChange = (state = [], action) => {
    switch (action.type) {
        case 'Condolation_ObjectChange':
            return {
                ...state,
                [action.module]: true
            };
        default:
            return state
    }
};
const fetchMenuList = (state = [], action) => {
    switch (action.type) {
        case 'Add_AddMenuList':
            return action.menuData;
        default:
            return state;
    }
}
const ggwTasbs=(state = {}, action)=>{
    switch (action.type) {
        case 'GGWTabs':
            return {
                ...state,
                ...action.tabs
            };
        default:
            return state;
    }
}
const editActive=(state={},action)=>{
    switch (action.type) {
        case 'EditActive':
            return action.activeObj
    
        default:
            return state
    }
}
export default combineReducers({
    userinfo, menuData, searchValue, serverCompany, address, allMemberData,
    condolationObject, fetchMenuList, condolationObject, condolationObjectChange,
    ggwTasbs,editActive
});
