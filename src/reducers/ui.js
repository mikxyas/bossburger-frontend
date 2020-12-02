import {CHANGED_LINK} from '../actions/types'

const initialValue = {
    link: ''
}

export default function (state = initialValue, action){
    switch(action.type){
        case CHANGED_LINK:
            return{
                link:action.payload
            }
        default:
            return state
    }
}