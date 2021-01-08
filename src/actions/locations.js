import {
    LOCATION_LOADED,
    TOGGLE_LOCATION_DIALOG,
    ADMIN_LOCATION_LOADED, 
    DELETE_LOC,
    LOADING_LOCATION, 
    LOCATION_ERROR, 
    LOCATION_CREATED,
    SET_USER_COORDS,
    TOGGLE_LOCATION_CREATED,
    TOGGLE_USER_LOCATED,
    GET_LOC_INFO
} from './types'
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
            const length = res.data.length
            dispatch({
                type: LOCATION_LOADED,
                payload: sortedbyId,
                length:length
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

export const loadAdminLoc = () => (dispatch, getState) => {
    axios
        .get('https://bossburgeraddis.herokuapp.com/api/admin/locations', tokenConfig(getState))
        .then((res) => {
            const sortedbyId = convertArrayToObject(res.data, 'id')
            const length = res.data.length
            dispatch({
                type: ADMIN_LOCATION_LOADED,
                payload: sortedbyId,
                length:length
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
export const GetLocData = (lat, lng) => (dispatch) => {
    const BossBurgerCoords = `38.7849085,8.9975752`;
    const APIKEY = '5b3ce3597851110001cf6248733ba87509204050bf15a867fcce0026';
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${APIKEY}&start=${BossBurgerCoords}&end=${lng},${lat}`;
    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }
    axios 
        .get(url)
        .then((res) => {
            const RouteCoords = res.data.features[0].geometry.coordinates
            const AllRouteCoords = []
            RouteCoords.forEach(Array => AllRouteCoords.push([Array[1], Array[0]]));
            const LocDistance = round(res.data.features[0].properties.summary.distance / 1000, 1)
            let Locprice = 0
            let distanceExceeded = false
            if(LocDistance <= 3 && LocDistance > 0){
                Locprice = 40
            }
            if(LocDistance <= 6 && LocDistance > 3){
                Locprice = 60
            }
            if(LocDistance <= 9 && LocDistance > 6){
                Locprice = 100
            }
            if(LocDistance <= 12 && LocDistance > 9){
                Locprice = 120
            }
            if(LocDistance <= 15 && LocDistance > 12){
                Locprice = 150
            }
            if(LocDistance > 15){
                distanceExceeded = true
            }
            dispatch({
                type: GET_LOC_INFO,
                price: Locprice,
                distance: LocDistance,
                route: AllRouteCoords,
                distanceExceeded: distanceExceeded
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
export const SetCoords = (lat, long) =>{
    return{
        type: SET_USER_COORDS,
        lat:lat,
        long:long
    }
}

export const toggleUserLocated = () => {
    return{
          type: TOGGLE_USER_LOCATED
    }

}
export const toggleLocationDialog = () => {
    return{
          type: TOGGLE_LOCATION_DIALOG
    }

}

export const toggleLocCreated = () => {
    return{
          type: TOGGLE_LOCATION_CREATED
    }

}