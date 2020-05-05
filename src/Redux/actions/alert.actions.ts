export const alertActions = {
    success,
    error,
    clear
};

function success(message:string) {
    return { type: 'success', message };
}

function error(message:string) {
    return { type: 'error', message };
}

function clear() {
    return { type: 'clear'};
}