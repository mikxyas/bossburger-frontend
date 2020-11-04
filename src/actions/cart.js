import {ADD_TO_CART, RECEIVE_ITEMS, DELETE_CART_ITEM} from './types';

export const addtoCart = (item) => {
    return {
        type: ADD_TO_CART,
        ...item
    }
}
export const deleteItem = (itemId) => {
    return {
        type: DELETE_CART_ITEM,
        id: itemId,
    }
}
export const receiveItems = (items) => {
    return {
        type: RECEIVE_ITEMS,
        items
    }
}

