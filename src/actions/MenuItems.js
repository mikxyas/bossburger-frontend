import axios from 'axios';
import {GET_MENU_ITEMS,ITEM_RATED,
    MENUITEM_AVAILABLE,MENUITEM_UNAVAILABLE,TOGGLE_ADD_MENUITEM,OPEN_SNACKBAR,MENUITEM_DELETED,MENUITEM_CREATED, GETTING_MENUITEMS, MENUITEMS_FAILED} from './types';
import {tokenConfig} from './auth'
import { Menu } from '@material-ui/core';

export const deleteMenuItem = (MenuItem) => (dispatch,getState) =>{
    const id = MenuItem.id
    axios
        .delete(`https://bossburgeraddis.herokuapp.com/api/menu/${id}/`, tokenConfig(getState))
        .then((res) => {
            // const cool = {
            //     [res.data.id]:{
            //         ...res.data
            //     }
            // };
            dispatch({
                type: MENUITEM_DELETED,
                payload: id,
            });
            dispatch({
                type: OPEN_SNACKBAR,
                payload:{message: "Menu item Deleted"}
            })
        })
            .catch((err) => {
            console.log(err)
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: MENUITEMS_FAILED
            });
        });

}

export const makeAvailable = (MenuItem) => (dispatch,getState) =>{
    MenuItem.available = true
    const id = MenuItem.id
    axios
        .put(`https://bossburgeraddis.herokuapp.com/api/menu/${id}/`, MenuItem,tokenConfig(getState))
        .then((res) => {
            // const cool = {
            //     [res.data.id]:{
            //         ...res.data
            //     }
            // };
            dispatch({
                type: MENUITEM_AVAILABLE,
                // payload: id,
            });
            dispatch({
                type: OPEN_SNACKBAR,
                payload:{message: "Menu item made Available"}
            })
        })
            .catch((err) => {
            console.log(err)
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: MENUITEMS_FAILED
            });
        });

}

export const makeunAvailable = (MenuItem) => (dispatch,getState) =>{
    MenuItem.available = false
    const id = MenuItem.id
    axios
        .put(`https://bossburgeraddis.herokuapp.com/api/menu/${id}/`, MenuItem,tokenConfig(getState))
        .then((res) => {
            // const cool = {
            //     [res.data.id]:{
            //         ...res.data
            //     }
            // };
            dispatch({
                type: MENUITEM_UNAVAILABLE,
                // payload: id,
            });
            dispatch({
                type: OPEN_SNACKBAR,
                payload:{message: "Menu item made Available"}
            })
        })
            .catch((err) => {
            console.log(err)
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: MENUITEMS_FAILED
            });
        });

}

export const rateItem = (MenuItem) => (dispatch,getState) =>{
    const id = MenuItem.id
    axios
        .put(`https://bossburgeraddis.herokuapp.com/api/menu/${id}/`, MenuItem,tokenConfig(getState))
        .then((res) => {
            // const cool = {
            //     [res.data.id]:{
            //         ...res.data
            //     }
            // };
            dispatch({
                type: ITEM_RATED,
                // payload: id,
            });
            dispatch({
                type: OPEN_SNACKBAR,
                payload:{message: "Menu Item Rated"}
            })
        })
            .catch((err) => {
            console.log(err)
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: MENUITEMS_FAILED
            });
        });

}

export const addMenuItem = (MenuItem) => (dispatch,getState) =>{
    const body = MenuItem
    axios
        .post('https://bossburgeraddis.herokuapp.com/api/menu/', body, tokenConfig(getState))
        .then((res) => {
            // const cool = {
            //     [res.data.id]:{
            //         ...res.data
            //     }
            // };
            dispatch({
                type: MENUITEM_CREATED,
                payload: res.data,
            });
        })
            .catch((err) => {
            console.log(err)
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: MENUITEMS_FAILED
            });
        });
        console.log(body.post_pic)

}

export const getMenuItems = () => dispatch =>{
    dispatch({type:GETTING_MENUITEMS})
    axios.get('https://bossburgeraddis.herokuapp.com/api/menu/')
    .then(res => {
        dispatch({
            type: GET_MENU_ITEMS,
            payload: res.data,     
        });
    }).catch(err =>  dispatch({type:MENUITEMS_FAILED}));
}

export const toggleAddMenuItem = () => (dispatch) => {
    dispatch({
        type:TOGGLE_ADD_MENUITEM
    })
}
