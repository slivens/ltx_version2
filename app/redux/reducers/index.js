
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
export default combineReducers({userinfo,menuData});
