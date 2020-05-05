import StorageService from '../../services/StorageService';
export function isLogged() {
    return {
         logedIn: (StorageService.getLogin()===null)? false: true
      };    
}