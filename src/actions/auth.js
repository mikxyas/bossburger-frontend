import {LOGIN_SUCCESS,
        TOGGLE_SIGNIN_DIALOG,
        AUTH_ERROR,
        USER_LOADING,
        LOGOUT_SUCCESS, 
        USER_LOADED,
        LOGIN_FAIL, 
        SET_DIALOG_STATE,
        REGISTER_FAIL,
        OPEN_SNACKBAR,
        ALL_USERS_LOADED,
        REGISTER_SUCCESS,
        UPDATED_USER_PROFILE} from './types';
import axios from 'axios'
import {convertArrayToObject, loadLoc} from './locations'
import {getMenuItems} from './MenuItems'
import store from '../store';


export const loadAllUser = () => (dispatch, getState) => {
    axios
        .get('https://bossburgeraddis.herokuapp.com/api/admin/auth/users', tokenConfig(getState))
        .then((res) => {
            const sortedbyId = convertArrayToObject(res.data, 'id')
            dispatch({
                type: ALL_USERS_LOADED,
                payload: sortedbyId
            });
        })
        .catch((err) => {
            console.log(err.response.data)
            dispatch({
                type: AUTH_ERROR,
            })
        })
    
    
}

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    axios
        .get('https://bossburgeraddis.herokuapp.com/api/auth/user/', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
            store.dispatch(loadLoc())
            store.dispatch(getMenuItems())
            
            
        })
        .catch((err) => {
            store.dispatch(getMenuItems())

            // dispatch(returnErrors(err.response.data, err.response.status))
            // console.log(err)
            dispatch({
                type: AUTH_ERROR,
            })
        })
    
    
}

export const register = (info) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    axios
        .post('https://bossburgeraddis.herokuapp.com/api/auth/register/', info, config)
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            dispatch({
                type:OPEN_SNACKBAR,
                payload:{message: "Registered Successfully! Please Sign in"}
            })
            // window.location.reload()

        })
        .catch((err) => {
            console.log(err.response.data)
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            });
            dispatch({
                type:OPEN_SNACKBAR,
                payload:err.response.data
            })
        });
};

export const login = (info) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    axios
        .post('https://bossburgeraddis.herokuapp.com/api/auth/login/', info, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            // store.dispatch()
            window.location.reload()
        })
        .catch((err) => {
            const error = err.response.data
            console.log(err.response.data)
            
            dispatch({
                type:OPEN_SNACKBAR,
                payload:error
            })
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

export const logout = () => (dispatch, getState) => {
    axios
      .post('https://bossburgeraddis.herokuapp.com/api/auth/logout/', null, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      })
      .catch((err) => {
          console.log(err)
        // dispatch(returnErrors(err.response.data, err.response.status));
      });
  };

  export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    // If token, add to headers config
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
  
    return config;
  };

  export const toggleSignupDialog = () => (dispatch) => {
      dispatch({
            type: TOGGLE_SIGNIN_DIALOG
      })
  }

  export const setDialogState = (dialogState) => {
    return{
        type: SET_DIALOG_STATE,
        payload:dialogState
    }
  }

export const UpdateAccountInfo = (info) => (dispatch, getState) => {
    axios
      .put('https://bossburgeraddis.herokuapp.com/api/auth/user/', info, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: UPDATED_USER_PROFILE,
          payload: res.data,
        });
        dispatch({
            type:OPEN_SNACKBAR,
            payload:{message: "Profile Updated"}
        })
      })
      .catch((err) => {
          console.log(err)
        // dispatch(returnErrors(err.response.data, err.response.status));
      });
}

//   export const updateUserPrimaryLoc = (primaryLocId) => (dispatch) => {
//     axios
//     .put(`https://bossburgeraddis.herokuapp.com/api/auth/users/${order.id}/`, body, tokenConfig(getState))
//     .then((res) => {
//         dispatch({
//             type: UPDATED_ORDER,
//             payload: order.id,
//         });
//         dispatch({
//             type: OPEN_SNACKBAR,
//             payload: {message:'Order Set to delivered'}
//         })
//     })
//         .catch((err) => {
//         console.log(err.response.data)
//         // dispatch(returnErrors(err.response.data, err.response.status));
//         dispatch({
//             type: ORDER_ERROR
//         });
//     });
//   }