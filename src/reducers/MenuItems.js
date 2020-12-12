import { GET_MENU_ITEMS,MENUITEM_CREATED, MENUITEM_DELETED, GETTING_MENUITEMS, MENUITEMS_FAILED, TOGGLE_ADD_MENUITEM} from '../actions/types.js';

const initialState = {
    itemsLoaded: false,
    MenuItems: [],
    fetchFailed:false,
    openAddMenu:false,

}

export default function(state = initialState, action) {
    switch(action.type) {
        case MENUITEM_DELETED:
            delete state.MenuItems[action.payload]
            return{
                ...state,
                MenuItems:[
                    ...state.MenuItems
                ]
            }
        case MENUITEM_CREATED:
            return{
                ...state,
                openAddMenu:false,
                MenuItems:[
                    ...state.MenuItems,
                    action.payload
                ]
            }
        case TOGGLE_ADD_MENUITEM:
            if (state.openAddMenu === false){
                return{
                    ...state,
                    openAddMenu: true
                }
            }if (state.openAddMenu === true){
                return{
                    ...state,
                    openAddMenu:false
                }
            }
        case GETTING_MENUITEMS:
            return {
                ...state,
            }
        case MENUITEMS_FAILED:
            return {
                ...state,
                itemsLoading:false,
                fetchFailed: true
            }
        case GET_MENU_ITEMS:
            return {
                ...state,
                MenuItems:action.payload,
                itemsLoaded: true
            }
        default:
            return state;
    } 
}