import {CLOSE_SNACKBAR} from './types'

export const CloseSnack = () => (dispatch) => {
    dispatch({
        type: CLOSE_SNACKBAR,
    })
}