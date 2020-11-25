import { combineReducers } from 'redux';
import MenuItems from './MenuItems'
import auth from './auth'
import cart from './cart'
import locations from './locations'
import order from './order'
import snackbar from './snackbar'
import events from './events'

export default combineReducers({
    MenuItems,
    auth,
    cart,
    events,
    locations,
    order,
    snackbar
});