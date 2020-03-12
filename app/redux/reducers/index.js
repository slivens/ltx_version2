/*
 * @Author: your name
 * @Date: 2019-10-16 13:54:08
 * @LastEditTime : 2020-01-07 16:09:22
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\redux\reducers\index.js
 */

import {combineReducers} from "redux";
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
const menuData = (state=[],action)=>{
    switch(action.type){
        case 'CHANGE_MENU':
            return [...action.data]
        default:
            return state
    }
}
const searchValue=(state="",action)=>{
    switch(action.type){
        case 'CHANGE_SEARCH_VALUE':
            return action.value
        default:
            return state
    }
}
export default combineReducers({userinfo,menuData,searchValue});
