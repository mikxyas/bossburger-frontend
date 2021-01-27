import {CHANGED_LINK,CHANGE_LINK_TO_FROM, ERROR_CHANGING_LINK, UPDATE_USER_DEVICE} from './types'

export const ChangeLink = (link) => (dispatch) => {
    dispatch({
        type: CHANGED_LINK,
        payload:link
    })
    // catch(err => dispatch({type:ERROR_CHANGING_LINK}))
}

export const ChangeLinkToFrom = (linkTo, linkFrom) => (dispatch) => {
    dispatch({
        type: CHANGE_LINK_TO_FROM,
        linkTo:linkTo,
        linkFrom:linkFrom
    })
}

export const UpdateDevice = (isMobile) => (dispatch) => {
    dispatch({
        type: UPDATE_USER_DEVICE,
        payload: isMobile,
    })
}