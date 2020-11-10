import {ADD_TO_CART,DELETE_CART_ITEM,ADD_AMOUNT,DECREASE_AMOUNT, RECEIVE_ITEMS} from '../actions/types';

const initialValue = {
    cart:{},
    AddedToCart:false,
    Amount:{},
    TotalPrice:0,
}

export default function (state = initialValue, action){
    switch(action.type){
        case ADD_TO_CART:
            return {
                ...state,
                cart:{
                ...state.cart,
                [action.id]:{
                    ...action,
                    // inCart: true,
                    }
                },
                Amount:{
                    ...state.Amount,
                    [action.id]: 1
                },
                AddedToCart:true,
                TotalPrice: state.TotalPrice + action.price
            }
        case DELETE_CART_ITEM:
            delete state.cart[action.id]
            delete state.Amount[action.id]
            return {
                ...state,
                Amount:{
                ...state.Amount,
                },
                cart:{
                ...state.cart,
                },
                TotalPrice: state.TotalPrice - action.price
            }
        case ADD_AMOUNT:
            return{
                ...state,
                Amount:{
                    ...state.Amount,
                    [action.id]: state.Amount[action.id] + 1
                },
                TotalPrice: state.TotalPrice + state.cart[action.id].price
            }
        case DECREASE_AMOUNT:
            return{
                ...state,
                Amount: {
                    ...state.Amount,
                    [action.id]: state.Amount[action.id] - 1
                },
                TotalPrice: state.TotalPrice - state.cart[action.id].price
            }
        default:
            return state
    }
}