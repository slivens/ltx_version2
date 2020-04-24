/*
 * @Author: your name
 * @Date: 2019-10-16 13:54:01
 * @LastEditTime: 2020-04-23 17:03:03
 * @LastEditors: Sliven
 * @Description: In User Settings Edit
 * @FilePath: \ltx\app\redux\actions\index.js
 */
const AddUserInfo = info => {
    return {
        type: "ADD_USER_INFO",
        info
    }
}
const changeMenu = data => {
    return {
        type: "CHANGE_MENU",
        data
    }
}
const changeSearchValue = value => {
    return {
        type: "CHANGE_SEARCH_VALUE",
        value
    }
}
const AddHomeServer = company => {
    return {
        type: "Add_HomeServer",
        company
    }
}
const SelectHomeServer = (select = []) => {
    return {
        type: "Select_HomeServer",
        select
    }
}
const Address = (address = []) => {
    return {
        type: "ADD_ADDRESS",
        address
    }
};
const AddAllMemberData = (memberData = []) => {
    return {
        type: "Add_AllMemberData",
        memberData
    }
};



const AddOtherServer=(val="")=>{
    return {
        type:"Add_OtherServer",
        val
    }
};

const CondolationObjectData = (condolationObjectData = [],module) => {
    return {
        type: "Condolation_ObjectData",
        condolationObjectData,
        module
    }
};

const CondolationObjectChange = (module) => {
    return {
        type: "Condolation_ObjectChange",
        module
    }
};
const AddMenuList=(menuData=[])=>{
    return {
        type:"Add_AddMenuList",
        menuData
    }
};
const GGWTabs=(tabs={})=>{
    return {
        type:"GGWTabs",
        tabs
    }
};
export {
    AddUserInfo,
    changeMenu,
    changeSearchValue,
    AddHomeServer,
    SelectHomeServer,
    Address,
    AddAllMemberData,
    AddOtherServer,
    CondolationObjectData,
    AddMenuList,
    CondolationObjectChange,
    GGWTabs
}