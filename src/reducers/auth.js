import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    TOGGLE_SIGNIN_DIALOG,
    SET_DIALOG_STATE,
    ALL_USERS_LOADED,
    UPDATED_USER_PROFILE,
    UPDATE_ORDER_INFO
  } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated:null,
    isLoading: false,
    openSigninDialog: false,
    UserLocation:null,
    isAdmin:false,
    AllUsers:{}
}

export default function (state=initialState, action) {
    switch(action.type) {
        case UPDATE_ORDER_INFO:
            return{
                ...state,
                user: action.payload
            }
        case UPDATED_USER_PROFILE:
            return{
                ...state,
                user: action.payload
            }
        case ALL_USERS_LOADED:
            return{
                ...state,
                AllUsers:{
                    ...action.payload
                }
            }
        case USER_LOADING:
            return{
                ...state,
                isLoading:true,           
            }
        case USER_LOADED:
            return{
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                isAdmin:action.payload.is_admin
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.key);
            return {
                ...state,
                user: action.payload,
                isAuthenticated:true,
                isLoading:false
            };
        
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case TOGGLE_SIGNIN_DIALOG:
            if(state.openSigninDialog === false){
                return{
                    ...state,
                    openSigninDialog:true
                }
            }else{
                return{
                    ...state,
                    openSigninDialog:false
                }
            }
            case SET_DIALOG_STATE:
                return{
                    ...state,
                    openSigninDialog:action.payload
                }
            default:
              return state;
            }    
}