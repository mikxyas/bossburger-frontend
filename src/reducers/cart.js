import {ADD_TO_CART,DELETE_CART_ITEM, RECEIVE_ITEMS} from '../actions/types';

const initialValue = {
}

export default function (state = initialValue, action){
    switch(action.type){
        case RECEIVE_ITEMS:
            return{
                ...state,
                ...action.items
            }
        case ADD_TO_CART:
            return {
                ...state,
                [action.id]:{
                    ...action
                    // inCart: true,
                }
            }
        case DELETE_CART_ITEM:
            delete state[action.id]
            return{
                ...state,
            }
        default:
            return state
    }
}