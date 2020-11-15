import {PLACE_ORDER, ORDER_ERROR, LOADED_ADMIN_ORDERS,ORDER_LOADED, UPDATED_ORDER} from '../actions/types'

const initialState = { 
    orders:[],
    AllOrders:{},
    orderPlaced: false
 }

export default function(state=initialState, action){
    switch(action.type){
        case UPDATED_ORDER:
            delete state.AllOrders[action.payload]
            return{
                ...state,
                AllOrders:{
                    ...state.AllOrders
                }
            }
        case PLACE_ORDER:
            return{
                ...state,
                orderPlaced:true
            }
        case ORDER_LOADED:
            return{
                ...state,
                orders:{
                    ...action.payload
                }
            }
        case LOADED_ADMIN_ORDERS:
            return{
                ...state,
                AllOrders:{
                    ...action.payload
                }
            }
        default:
            return state
    }
 }