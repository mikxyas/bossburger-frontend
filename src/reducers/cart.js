import {ADD_TO_CART,REMOVED_EXTRA,ADDED_EXTRA,DELETE_CART_ITEM,PLACE_ORDER,ADD_AMOUNT,DECREASE_AMOUNT, RECEIVE_ITEMS} from '../actions/types';

const initialValue = {
    cart:{},
    AddedToCart:false,
    Amount:{},
    TotalPrice:0,
    Extras:{status:'null'},
    order_type:'DVY'
}

export default function (state = initialValue, action){
    switch(action.type){
        case PLACE_ORDER:
            return{
                ...state,
                cart:{},
                Amount:{},
                TotalPrice:0,
                AddedToCart:false,
            }
        case ADDED_EXTRA:
            return{
                ...state,
                Extras:{
                    ...state.Extras,
                    status:'active',
                    [action.Bid]:action.Eid
                },
                TotalPrice: state.TotalPrice + action.price
            }
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
        case REMOVED_EXTRA:
            delete state.Extras[action.id]
            
            if(Object.keys(state.Extras).length === 1){
                return{
                    ...state,
                    Extras:{
                        status:'null'
                    }
                }
            }else{
            return{
                ...state,
                Extras:{
                    ...state.Extras
                }
            }
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