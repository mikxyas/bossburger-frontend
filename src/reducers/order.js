import {PLACE_ORDER,LOADED_ALL_ADMIN_ORDERS, ORDER_ERROR, LOADED_ADMIN_ORDERS,ORDER_LOADED, UPDATED_ORDER} from '../actions/types'


const initialState = { 
    orders:[],
    PendingOrders:{},
    AllOrders:{},
    orderPlaced: false
 }

export default function(state=initialState, action){
    switch(action.type){
        case UPDATED_ORDER:
            delete state.PendingOrders[action.payload]
            return{
                ...state,
                PendingOrders:{
                    ...state.PendingOrders
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
                PendingOrders:{
                    ...action.payload
                }
            }
        case LOADED_ALL_ADMIN_ORDERS:
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