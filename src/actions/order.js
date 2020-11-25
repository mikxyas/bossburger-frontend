import {PLACE_ORDER,UPDATED_ORDER, ORDER_ERROR, OPEN_SNACKBAR,ORDER_LOADED,LOADED_ADMIN_ORDERS} from './types';
import {tokenConfig} from './auth'
import axios from 'axios'
// import {convertArrayToObject} from './locations'

export const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };
export const placeOrder = (order) => (dispatch,getState) =>{
    const body = order
    axios
        .post('https://bossburgeraddis.herokuapp.com/api/order/', body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: PLACE_ORDER,
                payload: res.data,
            });
        })
            .catch((err) => {
                dispatch({
                    type: OPEN_SNACKBAR,
                    payload:err.response.data
                })
            console.log(err.response.data)
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: ORDER_ERROR
            });
        });
}

export const updateOrder = (order) => (dispatch,getState) =>{
    order.delivered = true
    order.time_delivered = new Date()
    const body = order
    axios
        .put(`https://bossburgeraddis.herokuapp.com/api/admin/orders/${order.id}/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: UPDATED_ORDER,
                payload: order.id,
            });
            dispatch({
                type: OPEN_SNACKBAR,
                payload: {message:'Order Set to delivered'}
            })
        })
            .catch((err) => {
            console.log(err.response.data)
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: ORDER_ERROR
            });
        });
}


export const loadOrders = () => (dispatch, getState) => {
    axios
        .get('https://bossburgeraddis.herokuapp.com/api/order', tokenConfig(getState))
        .then((res) => {
            const sortedbyId = convertArrayToObject(res.data, 'id')
            dispatch({
                type: ORDER_LOADED,
                payload: sortedbyId
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status))
            console.log(err)
            dispatch({
                type: ORDER_ERROR,
            })
        })
}

export const loadOrdersForAdmin = () => (dispatch, getState) => {
    axios
        .get('https://bossburgeraddis.herokuapp.com/api/admin/orders', tokenConfig(getState))
        .then((res) => {
            const sortedbyId = convertArrayToObject(res.data, 'id')
            dispatch({
                type: LOADED_ADMIN_ORDERS,
                payload: sortedbyId
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status))
            console.log("The Error is:" + err)
            dispatch({
                type: ORDER_ERROR,
            })
        })
}
