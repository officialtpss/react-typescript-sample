import StorageService from './StorageService';

export const userService = { hitApi, logout };

function hitApi(data: any, apiUrl: string, method: string, storage:boolean = false) {
    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(apiUrl, requestOptions)
        .then(handleResponse)
        .then(user => {
           if(storage){
             StorageService.setLogin(user)
           }
            return user;
        });
}

function logout() {
    StorageService.clearLogin();
    return true;
}

function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 404) {
                response.statusText = 'not found';
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}