import { combineReducers } from 'redux';
import MenuItems from './MenuItems'
import auth from './auth'
import cart from './cart'
import locations from './locations'
import order from './order'

export default combineReducers({
    MenuItems,
    auth,
    cart,
    locations,
    order
});