import {ADD_TO_CART, RECEIVE_ITEMS,ADD_AMOUNT,DECREASE_AMOUNT, DELETE_CART_ITEM} from './types';

export const addtoCart = (item) => {
    return {
        type: ADD_TO_CART,
        ...item
    }
}
export const deleteItem = (itemId, price) => {
    return {
        type: DELETE_CART_ITEM,
        id: itemId,
        price:price
    }
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

