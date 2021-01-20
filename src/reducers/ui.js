import {CHANGED_LINK, UPDATE_USER_DEVICE} from '../actions/types'

const initialValue = {
    link: '',
    mobile:false,
}

export default function (state = initialValue, action){
    switch(action.type){
        case CHANGED_LINK:
            return{
                ...state,
                link:action.payload
            }
        case UPDATE_USER_DEVICE:
            return{
                ...state,
                mobile:action.payload
            }
        default:
            return state
    }
}