import {LOCATION_LOADED, 
    TOGGLE_LOCATION_DIALOG,
    LOGOUT_SUCCESS, 
    LOCATION_CREATED,
    TOGGLE_LOCATION_CREATED,

    TOGGLE_USER_LOCATED,
    GET_LOC_INFO,
    SET_USER_COORDS,
    ADMIN_LOCATION_LOADED,
    DELETE_LOC
} from '../actions/types'

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
    locRoute:[],
    locDisExceeded:false,
}

export default function (state=initialState, action){
    switch(action.type){
        case TOGGLE_LOCATION_CREATED:
            if(state.locCreated === false){
                return {
                    ...state,
                    locCreated:true
                }
            }else{
                return {
                    ...state,
                    locCreated:false
                }
            }
        case GET_LOC_INFO:
            return {
                ...state,
                locPrice:action.price,
                locDistance: action.distance,
                locRoute: action.route,
                locInfoFetched: true,
                locDisExceeded: action.distanceExceeded
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
                locLength:action.length,
                
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