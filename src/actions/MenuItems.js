import axios from 'axios';
import {GET_MENU_ITEMS, GETTING_MENUITEMS, MENUITEMS_FAILED} from './types';

// get menu items

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

