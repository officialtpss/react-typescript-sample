const StorageService = {
    setLogin: function (data:any) {
        localStorage.setItem('__login', JSON.stringify(data));
    },
    getLogin: function () {
        const  data:any = localStorage.getItem('__login');
        return data == null ? null : JSON.parse(data);
    },
    clearLogin: function () {
        localStorage.removeItem('__login');
    }
};
export default StorageService;