import {CHANGED_LINK, ERROR_CHANGING_LINK} from './types'

export const ChangeLink = (link) => (dispatch) => {
    dispatch({
        type: CHANGED_LINK,
        payload:link
    })
    // catch(err => dispatch({type:ERROR_CHANGING_LINK}))
}