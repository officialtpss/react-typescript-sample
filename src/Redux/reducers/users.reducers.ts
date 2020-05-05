import { userConstants } from '../constants';

export function users(state = {}, action:any) {
    switch (action.type) {
        case userConstants.API_REQUEST:
           return {
                loading: true
            };
        case userConstants.API_SUCCESS:
            return {
                items: action
            };
        case userConstants.API_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}