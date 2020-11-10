import {PLACE_ORDER, ORDER_ERROR, ORDER_LOADED} from '../actions/types'

const initialState = { 
    orders:{}
 }

export default function(state=initialState, action){
    switch(action.type){
        case PLACE_ORDER:
            return{
                ...state,
            }
        case ORDER_LOADED:
            return{
                orders:{
                    ...action.payload
                }
            }
        default:
            return state
    }
 }