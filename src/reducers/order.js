import {PLACE_ORDER,DELETE_ORDER,UPDATE_ORDER_INFO,LOADED_ALL_ADMIN_ORDERS,TOGGLE_ORDER_TYPE_DIALOG, ORDER_ERROR, LOADED_ADMIN_ORDERS,ORDER_LOADED, UPDATED_ORDER} from '../actions/types'


const initialState = { 
    orders:[],
    PendingOrders:{},
    AllOrders:{},
    orderPlaced: false,
    openOrderType: false
 }

export default function(state=initialState, action){
    switch(action.type){
        case DELETE_ORDER:
            delete state.AllOrders[action.payload]
            return{
                ...state,
                AllOrders:{
                    ...state.AllOrders
                },
            }
        case UPDATE_ORDER_INFO:
            return{
                ...state,
                openOrderType:false
            }
        case TOGGLE_ORDER_TYPE_DIALOG:
            if(state.openOrderType === false){
                return{
                    ...state,
                    openOrderType:true
                }
            }else{
                return{
                    ...state,
                    openOrderType:false
                }
            }
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