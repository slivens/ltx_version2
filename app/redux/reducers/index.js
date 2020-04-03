/*
 * @Author: your name
 * @Date: 2019-10-16 13:54:08
 * @LastEditTime : 2020-01-07 16:09:22
 * @LastEditors  : Please set LastEditors
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
export default combineReducers({ userinfo, menuData, searchValue, serverCompany, address, allMemberData });
