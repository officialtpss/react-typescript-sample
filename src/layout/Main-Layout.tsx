import React from 'react';
import useStyles from './styles';
import { CssBaseline } from '@material-ui/core';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './../components/header/Header';
import SideBar from './../components/sidebar/Sidebar';
import Home from '././../pages/home/Home';
import AboutUs from '././../pages/about-us/About';
import ContactUs from '././../pages/contact-us/Contact';

import History from './../helpers/History';
import SignIn from '../pages/sign-in/SingIn';
import SingUp from './../pages/sing-up/SignUp';
import { Provider } from 'react-redux';
import store from '../Redux/store';
import Profile from './../pages/profile/Profile';
import { PrivateRoute } from '../helpers';
 
const MainLayout = () => {
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);

   const handleDrawerOpen = () => {
      setOpen(true);
   };

   const handleDrawerClose = () => {
      setOpen(false);
   };

   return <div className={classes.root}>
      <CssBaseline />
      <Provider store={store}>
         <Router history={History}>
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <SideBar open={open} handleDrawerClose={handleDrawerClose} />
            <main
               className={classes.content}
            >
               <div className={classes.toolbar} />
               <Switch>
                  <Route exact path={`${process.env.PUBLIC_URL}/home`} component={Home} />
                  <Route exact path={`${process.env.PUBLIC_URL}/about-us`} component={AboutUs} />
                  <Route exact path={`${process.env.PUBLIC_URL}/contact-us`} component={ContactUs} />
                  <Route exact path={`${process.env.PUBLIC_URL}/sing-in`} component={SignIn} />
                  <Route exact path={`${process.env.PUBLIC_URL}/sing-up`} component={SingUp} />
                  <PrivateRoute component={Profile} exact path={`${process.env.PUBLIC_URL}/profile`}  />
                  <Redirect to={`${process.env.PUBLIC_URL}/home`} />
               </Switch>

            </main>
         </Router>
      </Provider>
   </div>;
}

export default MainLayout;