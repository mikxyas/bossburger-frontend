import { GET_MENU_ITEMS} from '../actions/types.js';

const initialState = {
    MenuItems: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MENU_ITEMS:
            return {
                ...state,
                MenuItems:action.payload
            }
        default:
            return state;
    } 
}