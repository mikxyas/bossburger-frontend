import {CHANGED_LINK, UPDATE_USER_DEVICE} from '../actions/types'

const initialValue = {
    link: '',
    mobile:null,
}

export default function (state = initialValue, action){
    switch(action.type){
        case CHANGED_LINK:
            return{
                link:action.payload
            }
        case UPDATE_USER_DEVICE:
            return{
                mobile:action.payload
            }
        default:
            return state
    }
}