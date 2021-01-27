import {CHANGED_LINK,CHANGE_LINK_TO_FROM, UPDATE_USER_DEVICE} from '../actions/types'

const initialValue = {
    link: '',
    mobile:false,
    prevLink:'',
    currentLink:''
}

export default function (state = initialValue, action){
    switch(action.type){
        case CHANGE_LINK_TO_FROM:
            return{
                ...state,
                prevLink:action.linkFrom,
                currentLink:action.linkTo
            }
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