import { GET_MENU_ITEMS, GETTING_MENUITEMS, MENUITEMS_FAILED} from '../actions/types.js';

const initialState = {
    itemsLoading: true,
    MenuItems: [],
    fetchFailed:false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GETTING_MENUITEMS:
            return {
                ...state,
                itemsLoading:true
            }
        case MENUITEMS_FAILED:
            return {
                ...state,
                itemsLoading:false,
                fetchFailed: true
            }
        case GET_MENU_ITEMS:
            return {
                MenuItems:action.payload,
                itemsLoading: false
            }
        default:
            return state;
    } 
}