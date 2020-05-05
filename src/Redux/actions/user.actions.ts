import { userConstants, apiUrl } from '../constants';
import { userService } from './../../services/UserService';
import { alertActions } from './alert.actions';
export const userActions = {
    login,
    register,
    logout
};

function login(data: any, path: any) {
    return (dispatch: any) => {
        dispatch(request({ data }));
        try {
            setTimeout(() => {
                userService.hitApi(data, `${apiUrl}${path}`, 'PUT', true)
                    .then(
                        (userData: any) => {
                            dispatch(success(userData));
                            dispatch(alertActions.success('LoggedIn successfully'));
                        },
                        (error: any) => {
                            dispatch(failure(error));
                            if (error.length) {
                                dispatch(alertActions.error(error));
                            } else {
                                dispatch(alertActions.error('Not found'));
                            }

                        }
                    );
            }, 500);
        } catch (err) {
            dispatch(failure(err));
            dispatch(alertActions.error(err));
        }
    };
    function request(data: any) { return { type: userConstants.API_REQUEST, data } }
    function success(data: any) { return { type: userConstants.API_SUCCESS, data } }
    function failure(error: any) { return { type: userConstants.API_FAILURE, error } }
}

function register(data: any, path: string) {
    return (dispatch: any) => {
        dispatch(request({ data }));
        try {
            setTimeout(() => {
                userService.hitApi(data, `${apiUrl}${path}`, 'POST', false)
                    .then(
                        (userData: any) => {
                            dispatch(success({ data: userData }));
                            if (userData.message !== void 0) {
                                dispatch(alertActions.success(userData.message));
                            }
                        },
                        (error: any) => {
                            dispatch(failure(error));
                            if (error.length) {
                                dispatch(alertActions.error(error));
                            } else {
                                dispatch(alertActions.error('Not found'));
                            }

                        }
                    );
            }, 500);
        } catch (err) {
            dispatch(failure(err));
            dispatch(alertActions.error(err));
        }
    };
    function request(data: any) { return { type: userConstants.API_REQUEST, data } }
    function success(data: any) { return { type: userConstants.API_SUCCESS, data } }
    function failure(error: any) { return { type: userConstants.API_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}