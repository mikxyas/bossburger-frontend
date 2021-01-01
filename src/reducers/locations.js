import {LOCATION_LOADED, 
    TOGGLE_LOCATION_DIALOG,
    LOADING_LOCATION,
    LOGOUT_SUCCESS, 
    LOCATION_ERROR, 
    LOCATION_CREATED,
    LOGIN_SUCCESS,
    TOGGLE_USER_LOCATED,
    GET_LOC_INFO,
    SET_USER_COORDS,
    ADMIN_LOCATION_LOADED,
    DELETE_LOC,
    SET_DIALOG_STATE} from '../actions/types'

const initialState = {
    locations:{},
    Adminlocations:{},
    locLoaded:false,
    openLocationDialog: false,
    locLength:0,
    UserLatitude:'',
    UserLongitude:'',
    UserLocated:false,
    locInfoFetched:false,
    locDistance:0,
    locCreated:false,
    locPrice:0,
    locRoute:[]
}

export default function (state=initialState, action){
    switch(action.type){
        case GET_LOC_INFO:
            return {
                ...state,
                locPrice:action.price,
                locDistance: action.distance,
                locRoute: action.route,
                locInfoFetched: true,
            }
        case SET_USER_COORDS:
            return {
                ...state,
                UserLatitude:action.lat,
                UserLongitude: action.long,
                UserLocated:true,
            }

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
                locCreated:true,
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
            case TOGGLE_USER_LOCATED:
                if(state.UserLocated === false){
                    return {
                        ...state,
                        UserLocated:true
                    }
                }else{
                    return {
                        ...state,
                        UserLocated:false
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