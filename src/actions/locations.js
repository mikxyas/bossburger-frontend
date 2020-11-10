import {LOCATION_LOADED,TOGGLE_LOCATION_DIALOG, DELETE_LOC,LOADING_LOCATION, LOCATION_ERROR, LOCATION_CREATED} from './types'
import {tokenConfig} from './auth';
import axios from 'axios'

export const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };

export const loadLoc = () => (dispatch, getState) => {
    dispatch({type: LOADING_LOCATION});
    axios
        .get('https://bossburgeraddis.herokuapp.com/api/locations', tokenConfig(getState))
        .then((res) => {
            const sortedbyId = convertArrayToObject(res.data, 'id')
            dispatch({
                type: LOCATION_LOADED,
                payload: sortedbyId
            });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status))
            console.log(err)
            dispatch({
                type: LOCATION_ERROR,
            })
        })
}

export const createLoc = (loc) => (dispatch,getState) =>{
    const body = loc
    axios
        .post('https://bossburgeraddis.herokuapp.com/api/locations/', body, tokenConfig(getState))
        .then((res) => {
            const cool = {
                [res.data.id]:{
                    ...res.data
                }
            };
            dispatch({
                type: LOCATION_CREATED,
                payload: cool,
            });
        })
            .catch((err) => {
            console.log(err)
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOCATION_ERROR
            });
        });
}

export const deleteLoc = (id) => (dispatch,getState) =>{
    axios
        .delete(`https://bossburgeraddis.herokuapp.com/api/locations/${id}`, tokenConfig(getState))
        
            // const cool = convertArrayToObject(res.data, 'id')
           .then(
               dispatch({
                type: DELETE_LOC,
                id: id,
            })
           )
        
        .catch((err) => {
            console.log(err)
            // dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOCATION_ERROR
            });
        });
}


export const toggleLocationDialog = () => {
    return{
          type: TOGGLE_LOCATION_DIALOG
    }

}