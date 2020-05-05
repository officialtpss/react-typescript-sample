import React, { useEffect } from 'react';
import { FormControl, TextField, makeStyles, Button } from '@material-ui/core';
import PageTitle from '../page-title/PageTitle';
import { connect, useDispatch } from 'react-redux';
import { alertActions } from '../../Redux/actions/alert.actions';
import { useSnackbar } from 'notistack';
import { userActions } from '../../Redux/actions/user.actions';

const useStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: 600,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
        textAlign: 'center',
        border: '1px solid #e2e2e2',
        marginTop: '8%'
    },
    mb30: {
        marginBottom: '20px'
    },
    boxContainer: {
        padding: '50px 20px',
    },
    warning: {
        color: 'red',
        textAlign: 'left',
        fontSize: '12px',
        padding: '3px 0'
    }
}));
const SignIn = (props: any) => {
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors]: any = React.useState({});
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        dispatch(alertActions.clear());
        if(props.logedIn){
            props.history.push('/profile');
        }
     },[dispatch,props.logedIn,props.history]);

    useEffect(() => {
        if (props.alert !== void 0 && props.alert.type !== void 0) {
            const variant: any = (props.alert.type === 'alert-danger') ? 'error' : 'success';
            enqueueSnackbar(props.alert.message, { variant, preventDuplicate: true });
            if (props.alert.type === 'alert-success') {
                resetForm();
            }
        }
    }, [props, enqueueSnackbar]);

    useEffect(() => {
        return () => {
            dispatch(alertActions.clear());
        };
    }, [dispatch]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setErrors('');
    }
    const handleValidation = () => {
        // eslint-disable-next-line no-useless-escape
        let emailField = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let errors: any = {};
        let formIsValid = true;
        if (email.length === 0) {
            formIsValid = false;
            errors['email'] = 'Email cannot be empty';
        } else if (email.length !== 0 && emailField.test(email) === false) {
            formIsValid = false;
            errors['email'] = 'Email id is invalid';
        }

        if (password.length === 0) {
            formIsValid = false;
            errors['password'] = 'Password cannot be empty';
        }
        setErrors(errors);
        return formIsValid;
    };
    const submitData = () => {
        if (handleValidation()) {
            dispatch(alertActions.clear());
            dispatch(userActions.login({
                email: email,
                password: password
            }, 'users'))
        }
    }
    return (
        <>
            <div className={classes.paper}>
                <PageTitle title={'Sign In'} divider={true} />
                <div className={classes.boxContainer}>
                    <FormControl fullWidth className={classes.mb30}>
                        <TextField id='login-email' value={email} onChange={e => setEmail(e.target.value.trim())} className='form-control' label='Email' type='email' required autoComplete='off' />
                        <div className={(errors['email'] !== void 0 && errors['email'].length) ? classes.warning : ''}>{errors['email']}</div>
                    </FormControl>
                    <FormControl fullWidth className={classes.mb30}>
                        <TextField id='login-password' value={password} onChange={e => setPassword(e.target.value.trim())} className='form-control' label='Password' type='password' required autoComplete='off' />
                        <div className={(errors['password'] !== void 0 && errors['password'].length) ? classes.warning : ''}>{errors['password']}</div>
                    </FormControl>
                    <FormControl className={classes.mb30}></FormControl> <Button variant="contained" color="primary" size='large' disabled={(props.loading !== void 0 && props.loading === true) ? true : false} onClick={submitData}>Submit</Button>
                </div>
            </div>

        </>
    )
}
const mapStateToProps = (state: any) => {
    const { loading } = state.users;
    const { alert } = state;
    const { logedIn } = state.isLogged;
   
    return {
        loading,
        alert,
        logedIn
    };
}
export default connect(mapStateToProps)(SignIn);