export function alert(state = {}, action:any) {
    switch (action.type) {
        case 'success':
            return {
                type: 'alert-success',
                message: action.message
            };
        case 'error':
            return {
                type: 'alert-danger',
                message: action.message
            };
        case 'clear':
            return {};
        default:
            return state
    }
}