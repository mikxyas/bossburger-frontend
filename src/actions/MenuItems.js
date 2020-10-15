import axios from 'axios';
import {GET_MENU_ITEMS} from './types';

// get menu items

export const getMenuItems = () => dispatch =>{
    axios.get('https://bossburger.herokuapp.com/menu/')
    .then(res => {
        dispatch({
            type: GET_MENU_ITEMS,
            payload: res.data
        });
    }).catch(err => console.log(err));
}

