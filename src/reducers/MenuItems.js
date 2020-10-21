import { GET_MENU_ITEMS} from '../actions/types.js';

const initialState = {
    itemsLoaded: false,
    MenuItems: [],
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MENU_ITEMS:
            return {
                MenuItems:action.payload,
                itemsLoaded: true
            }
        default:
            return state;
    } 
}