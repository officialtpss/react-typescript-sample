import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import StorageService from '../services/StorageService';

 export const PrivateRoute = ({component, ...rest}: any) => {
    const routeComponent = (props: any) => (
        (StorageService.getLogin()!==null)
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/sing-in'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};