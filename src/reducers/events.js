import {
    GET_EVENTS,
    EVENT_ERR,
    TOGGLE_EVENT_VIEWER,
    VIEW_EVENT,
    TOGGLE_ADD_EVENT,
    EVENT_CREATED,
    EVENT_DELETED
} from '../actions/types'

const initialState = {
    events:{},
    eventsLoaded:false,
    openedEvent:{},
    openEventViewer:false,
    openAddEvent:false
}

export default function (state=initialState, action){
    switch(action.type){
        case EVENT_DELETED:
            delete state.events[action.payload]
            return{
                ...state,
                events:{
                    ...state.events
                }
            }
        case EVENT_CREATED:
            return{
                ...state,
                openAddEvent:false,
                events:{
                    ...state.events,
                    ...action.payload
                }
            }
        case TOGGLE_ADD_EVENT:
            if (state.openAddEvent === false){
                return{
                    ...state,
                    openAddEvent: true
                }
            }if (state.openAddEvent === true){
                return{
                    ...state,
                    openAddEvent:false
                }
            }
        case TOGGLE_EVENT_VIEWER:
            if (state.openEventViewer === false){
                return{
                    ...state,
                    openEventViewer: true
                }
            }if (state.openEventViewer === true){
                return{
                    ...state,
                    openEventViewer:false
                }
            }
        case VIEW_EVENT:
            return{
                ...state,
                openedEvent:{
                    ...state.events[parseInt(action.payload)]
                },
                openEventViewer:true
            }
        case GET_EVENTS:
            return{
                ...state,
                events:{
                    ...action.payload
                }
            }
        default:
            return state
    }
}