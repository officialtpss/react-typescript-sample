import React from 'react';
import clsx from 'clsx';
import { Typography, AppBar, Toolbar, IconButton, CssBaseline, withStyles } from '@material-ui/core';
import {
    Menu as MenuIcon,
} from '@material-ui/icons';
import useStyles from './../../layout/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
const ColorLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: '#b2dfdb',
    },
    barColorPrimary: {
        backgroundColor: '#00695c',
    },
})(LinearProgress);

const Header = (props: any) => {
    const classes = useStyles();
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: props.open,
            })}
        >   <CssBaseline /> { (props.loading !==void 0 && props.loading===true )?<ColorLinearProgress style={{position: 'absolute', width: '100%'}}/>:''    } 
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, props.open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    ReactJs-TypeScript
          </Typography>
            </Toolbar>
        </AppBar>)
} 
function mapStateToProps(state: any) {
    const { loading } = state.users;
     return {
        loading,
     };
}
export default connect(mapStateToProps)(Header);