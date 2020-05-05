import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import useStyles from '../../layout/styles';
const PageTitle = (props:any) => {
     const classes = useStyles();
    return(<><Typography variant={'h4'} className={classes.pageTitle}>{props.title}</Typography> {(props.divider)? '':<Divider className={classes.pageDivier}/>}</>)
};
export default PageTitle;