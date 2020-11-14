import {LOCATION_LOADED, 
    TOGGLE_LOCATION_DIALOG,
    LOADING_LOCATION,
    LOGOUT_SUCCESS, 
    LOCATION_ERROR, 
    LOCATION_CREATED,
    LOGIN_SUCCESS,
    ADMIN_LOCATION_LOADED,
    DELETE_LOC,
    SET_DIALOG_STATE} from '../actions/types'

const initialState = {
    locations:{},
    Adminlocations:{},
    locLoaded:false,
    openLocationDialog: false,
    locLength:0,
}

export default function (state=initialState, action){
    switch(action.type){
        case LOCATION_LOADED:
            return {
                ...state,
                locLoaded:true,
                locations:{ ...action.payload},
                locLength:action.length
            }
        case ADMIN_LOCATION_LOADED:
            return {
                ...state,
                Adminlocations:{...action.payload}
            }
        case LOCATION_CREATED:
            return {
                ...state,
                locLoaded:true,
                locations:{
                ...state.locations,
                ...action.payload
                },
                locLength: state.locLength +1,
                openLocationDialog:false
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
                locations:{},
                locLength:0
            }
        case DELETE_LOC:
            delete state.locations[action.id]
            return{
                ...state,
                locations:{
                    ...state.locations
                },
                locLength: state.locLength  - 1

            }
        default:
            return state
    }
}