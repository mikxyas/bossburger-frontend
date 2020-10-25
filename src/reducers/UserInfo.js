import { SEND_USER_INFO } from '../actions/types.js';

const initialState = {
    UserInfo: [],
    isVerf:false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SEND_USER_INFO:
            return {
                ...state,
                UserInfo:action.payload
            }
        default:
            return state;
    } 
}