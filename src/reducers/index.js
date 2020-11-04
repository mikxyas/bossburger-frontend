import { combineReducers } from 'redux';
import MenuItems from './MenuItems'
import auth from './auth'
import cart from './cart'

export default combineReducers({
    MenuItems,
    auth,
    cart
});