import {SEND_USER_INFO} from './types';

export const SendInfo = userInfo  => ({
    type: SEND_USER_INFO,
    payload:userInfo
    
})