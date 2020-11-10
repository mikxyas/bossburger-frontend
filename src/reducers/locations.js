import {LOCATION_LOADED, 
    TOGGLE_LOCATION_DIALOG,
    LOADING_LOCATION,
    LOGOUT_SUCCESS, 
    LOCATION_ERROR, 
    LOCATION_CREATED,
    LOGIN_SUCCESS,
    DELETE_LOC,
    SET_DIALOG_STATE} from '../actions/types'

const initialState = {
    locations:null,
    locLoaded:false,
    openLocationDialog: false,
}

export default function (state=initialState, action){
    switch(action.type){
        case LOCATION_LOADED:
            return {
                ...state,
                locLoaded:true,
                locations:{ ...action.payload}
            }
        case LOCATION_CREATED:
            return {
                ...state,
                locLoaded:true,
                locations:{
                ...state.locations,
                ...action.payload
                }
            }
        case TOGGLE_LOCATION_DIALOG:
            if(state.openLocationDialog === false){
                return {
                    ...state,
                    openLocationDialog:true
                }
            }else{
                return {
                    ...state,
                    openLocationDialog:false
                }
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                locLoaded:false,
                locations:null
            }
        case DELETE_LOC:
            delete state.locations[action.id]
            return{
                ...state,
                locations:{
                    ...state.locations
                }
            }
        default:
            return state
    }
}