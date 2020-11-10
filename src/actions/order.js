import {PLACE_ORDER, ORDER_ERROR, ORDER_LOADED} from './types';
import {tokenConfig} from './auth'
import axios from 'axios'
import {convertArrayToObject} from './locations'

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
            console.log(err)
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
