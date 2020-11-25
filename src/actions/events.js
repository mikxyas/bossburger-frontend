import {
    GET_EVENTS,
    EVENT_ERR,
    VIEW_EVENT,
    TOGGLE_EVENT_VIEWER,
    TOGGLE_ADD_EVENT,
    EVENT_CREATED,
    EVENT_DELETED,
    OPEN_SNACKBAR
} from './types'
import axios from 'axios'
import {convertArrayToObject} from './locations'

export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token;
  
    // Headers
    const config = {
        headers: {'Content-Type': 'application/json' },
    };
  
    // If token, add to headers config
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
  
    return config;
  };


export const addEvent = (event) => (dispatch,getState) =>{
    const body = event
    axios
        .post('https://bossburgeraddis.herokuapp.com/api/posts/', body, tokenConfig(getState))
        .then((res) => {
            const cool = {
                [res.data.id]:{
                    ...res.data
                }
            };
            dispatch({
                type: EVENT_CREATED,
                payload: cool,
            });
        })
            .catch((err) => {
            console.log(err.response.data)
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: EVENT_ERR
            });
        });
        console.log(body.post_pic)

}

export const deleteEvent = (event) => (dispatch,getState) =>{
    const id = event.id
    axios
        .delete(`https://bossburgeraddis.herokuapp.com/api/posts/${id}/`, tokenConfig(getState))
        .then((res) => {
            // const cool = {
            //     [res.data.id]:{
            //         ...res.data
            //     }
            // };
            dispatch({
                type: EVENT_DELETED,
                payload: id,
            });
            dispatch({
                type: OPEN_SNACKBAR,
                payload:{message: "Event Deleted"}
            })
        })
            .catch((err) => {
            console.log(err.response.data)
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: EVENT_ERR
            });
        });

}

export const loadEvents = () => (dispatch, getState) => {
    axios
        .get('https://bossburgeraddis.herokuapp.com/api/posts/')
        .then((res) => {
            const sortedbyId = convertArrayToObject(res.data, 'id')
            // const length = res.data.length
            console.log(res.data)
            dispatch({
                type: GET_EVENTS,
                payload: sortedbyId,
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status))
            console.log(err)
            dispatch({
                type: EVENT_ERR,
            })
        })
}

export const toggleAddEvent = () => (dispatch) => {
    dispatch({
        type:TOGGLE_ADD_EVENT
    })
}

export const viewEvent = (id) => (dispatch) => {
    dispatch({
        type:VIEW_EVENT,
        payload:id
    })
}

export const toggleEventViewer = () => (dispatch) => {
    dispatch({
        type:TOGGLE_EVENT_VIEWER,
    })
}