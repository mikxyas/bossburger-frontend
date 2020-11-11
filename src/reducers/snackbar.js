import {OPEN_SNACKBAR, CLOSE_SNACKBAR} from '../actions/types';

const initialState = {
    openSnack:false,
    message:''
}

export default function(state=initialState, action){
    switch (action.type) {
        case OPEN_SNACKBAR :
            return {
                openSnack:true,
                message:action.payload
            }
        case CLOSE_SNACKBAR:
            return {
                openSnack:false,
                message:''
            }
        default:
            return state;
    }
}