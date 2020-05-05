import React, { useEffect } from 'react';
import { Drawer, IconButton, useTheme, Divider } from '@material-ui/core';
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Home as HomeIcon,
    Info as InfoIcon,
    Input as InputIcon,
    ContactMail as ContactMailIcon,
    ExitToApp as ExitToAppIcon,
    AssignmentReturn as AssignmentReturnIcon,
    AccountCircle as  AccountCircleIcon,

} from '@material-ui/icons';
import useStyles from './../../layout/styles';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import SideNavigation from './SideNavigation';

const SideBar = (props: any) => {
    const MenuBar = [{
        name: 'Home',
        icon: HomeIcon,
        route: `${process.env.PUBLIC_URL}/home`,
        type: 'public',
    }, {
        name: 'About Us',
        icon: InfoIcon,
        route: `${process.env.PUBLIC_URL}/about-us`,
        type: 'public',
    }, {
        name: 'Contact Us',
        icon: ContactMailIcon,
        route: `${process.env.PUBLIC_URL}/contact-us`,
        type: 'public',
    }, {
        name: 'Sing Up',
        icon: AssignmentReturnIcon,
        route: `${process.env.PUBLIC_URL}/sing-up`,
        type: 'protected',
    }, {
        name: 'Sing In',
        icon: InputIcon,
        route: `${process.env.PUBLIC_URL}/sing-in`,
        type: 'protected',
    }, {
        name: 'Profile',
        icon: AccountCircleIcon,
        route: `${process.env.PUBLIC_URL}/profile`,
        type: 'private',
    }];
    const classes = useStyles();
    const theme = useTheme();
    const [activeMenu, setActiveMenu] = React.useState('');

    const defaultTitle = 'ReactJs-TypeScript';

    useEffect(() => {
        const { pathname } = props.location;
        setActiveMenu(pathname);
        document.title = (((MenuBar.filter(x => x.route === pathname))).length > 0) ? `${(MenuBar.filter(x => x.route === pathname))[0].name} | ${defaultTitle}` : defaultTitle
    }, [props.location, MenuBar])

    return (
        <Drawer
            variant={'permanent'}
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: props.open,
                [classes.drawerClose]: !props.open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: props.open,
                    [classes.drawerClose]: !props.open,
                }),
            }}
        >
            <div className={`${classes.toolbar} ${classes.defaultBackGroundColor}`}>
                <IconButton onClick={props.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
           <SideNavigation activeMenu={activeMenu} MenuBar={MenuBar} ExitToAppIcon={ExitToAppIcon} classes={classes} history={props.history} />

        </Drawer>)
}

export default withRouter(SideBar);