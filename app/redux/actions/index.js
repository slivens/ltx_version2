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
const AddHomeServer= company=>{
    return {
        type:"Add_HomeServer",
        company
    }
}
const SelectHomeServer= (select=[])=>{
    return {
        type:"Select_HomeServer",
        select
    }
}
const Address= (address=[])=>{
    return {
        type:"ADD_ADDRESS",
        address
    }
}
const AddAllMemberData=(memberData=[])=>{
    return {
        type:"Add_AllMemberData",
        memberData
    }
}
const AddOtherServer=(val="")=>{
    return {
        type:"Add_OtherServer",
        val
    }
}
export {
    AddUserInfo,
    changeMenu,
    changeSearchValue,
    AddHomeServer,
    SelectHomeServer,
    Address,
    AddAllMemberData,
    AddOtherServer
}