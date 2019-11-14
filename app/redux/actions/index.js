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
export {
    AddUserInfo,
    changeMenu
}