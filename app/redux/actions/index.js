/*
 * @Author: your name
 * @Date: 2019-10-16 13:54:01
 * @LastEditTime: 2020-01-07 15:43:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\redux\actions\index.js
 */
const AddUserInfo =  info =>{
    return{
        type:"ADD_USER_INFO",
        info
    }
}
const changeMenu = data=>{
    return {
        type:"CHANGE_MENU",
        data
    }
}
const changeSearchValue= value=>{
    return {
        type:"CHANGE_SEARCH_VALUE",
        value
    }
}
export {
    AddUserInfo,
    changeMenu,
    changeSearchValue
}