import {CHANGED_LINK, ERROR_CHANGING_LINK, UPDATE_USER_DEVICE} from './types'

export const ChangeLink = (link) => (dispatch) => {
    dispatch({
        type: CHANGED_LINK,
        payload:link
    })
    // catch(err => dispatch({type:ERROR_CHANGING_LINK}))
}

export const UpdateDevice = (isMobile) => (dispatch) => {
    dispatch({
        type: UPDATE_USER_DEVICE,
        payload: isMobile,
    })
}