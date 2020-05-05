import React from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { userActions } from '../../Redux/actions/user.actions';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';


const SideNavigation = (props: any) => {
    const getActiveColor = (name: string) => (props.activeMenu === name) ? 'primary' : 'action';
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const logout = () => {
        dispatch(userActions.logout());
        enqueueSnackbar('Logout successfully', { variant: 'success', preventDuplicate: true });
        props.history.push('/sing-in')
    }
    return (
        <>
            <List>
                {props.MenuBar.map((x: any, index: number) => {
                    if (x.type === 'private') {
                        return (props.logedIn) ? <NavLink to={x.route} className={props.classes.navLinkStyle} key={index} activeClassName={props.classes.navLinkActive} ><ListItem button>
                            <ListItemIcon ><x.icon color={getActiveColor(x.route)} /></ListItemIcon>
                            <ListItemText primary={x.name} /></ListItem></NavLink> : ''
                    } else if (x.type === 'protected') {
                        return (!props.logedIn) ? <NavLink to={x.route} className={props.classes.navLinkStyle} key={index} activeClassName={props.classes.navLinkActive} ><ListItem button>
                            <ListItemIcon ><x.icon color={getActiveColor(x.route)} /></ListItemIcon>
                            <ListItemText primary={x.name} />           </ListItem></NavLink> : ''
                    } else {
                        return <NavLink to={x.route} className={props.classes.navLinkStyle} key={index} activeClassName={props.classes.navLinkActive} ><ListItem button>
                            <ListItemIcon ><x.icon color={getActiveColor(x.route)} /></ListItemIcon><ListItemText primary={x.name} /></ListItem></NavLink>
                    }

                })}
            </List>
            {
                props.logedIn && <><Divider />
                    <List>
                        <ListItem button onClick={() => logout()}>
                            <ListItemIcon><props.ExitToAppIcon /></ListItemIcon>
                            <ListItemText  primary={'Logout'} />
                        </ListItem>
                    </List>
                </>
            }
        </>
    )

}

const mapStateToProps = (state: any) => {
    const { logedIn } = state.isLogged;
    return {
        logedIn
    };
}
export default connect(mapStateToProps)(SideNavigation);