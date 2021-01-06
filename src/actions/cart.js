import {ADD_TO_CART, REMOVED_EXTRA,ADDED_EXTRA, OPEN_SNACKBAR,RECEIVE_ITEMS,ADD_AMOUNT,DECREASE_AMOUNT, DELETE_CART_ITEM} from './types';

export const addtoCart = (item) => (dispatch) => {
    dispatch({
        type: ADD_TO_CART,
        ...item
    })
    dispatch({
        type: OPEN_SNACKBAR,
        payload:{message:`Added ${item.name} to cart`},
    })
}
export const deleteItem = (itemId, price) => (dispatch) =>{
    dispatch({
        type: DELETE_CART_ITEM,
        id: itemId,
        price:price
    })
    dispatch({
        type: OPEN_SNACKBAR,
        payload:{message:'Removed item from cart'},
    })
}
export const receiveItems = (items) => {
    return {
        type: RECEIVE_ITEMS,
        items
    }
}
export const addAmountof = (id) => {
    return {
        type: ADD_AMOUNT,
        id:id
    }
}
export const decreaseAmountof = (id) => {
    return {
        type: DECREASE_AMOUNT,
        id:id
    }
}
export const removeExtra = (id) => {
    return {
        type: REMOVED_EXTRA,
        id:id
    }
}
export const addExtra = (Bid, Eid, price) => {
    return {
        type: ADDED_EXTRA,
        Bid:Bid,
        Eid:Eid,
        price: price
    }
}

