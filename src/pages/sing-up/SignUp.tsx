import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FormControl, TextField, makeStyles, Button } from '@material-ui/core';
import PageTitle from '../page-title/PageTitle';
import { userActions, alertActions } from './../../Redux/actions/index.actions';
import { useSnackbar } from "notistack";
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
        marginBottom: '30px'
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
const SingUp = (props: any) => {
    const classes = useStyles();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors]: any = React.useState({});
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        dispatch(alertActions.clear());
        if (props.logedIn) {
            props.history.push('/home');
        }
    }, [dispatch, props.logedIn, props.history]);

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

    const handleValidation = () => {
        // eslint-disable-next-line no-useless-escape
        let emailField = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let errors: any = {};
        let formIsValid = true;

        if (firstName.length === 0) {
            formIsValid = false;
            errors['firstName'] = 'First name cannot be empty';
        }
        if (lastName.length === 0) {
            formIsValid = false;
            errors['lastName'] = 'Last name cannot be empty';
        }
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
            dispatch(userActions.register({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            }, 'users'))
        }
    }
    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setErrors('');
    }
    return (
        <>
            <div className={classes.paper}>
                <PageTitle title={'Sign Up'} divider={true} />
                <div className={classes.boxContainer}>

                    <FormControl fullWidth className={classes.mb30}>
                        <TextField id='sign-up-email' label='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value.trim())} type='text' required autoComplete='off' />
                        <div className={(errors['firstName'] !== void 0 && errors['firstName'].length) ? classes.warning : ''}>{errors['firstName']}</div>
                    </FormControl>
                    <FormControl fullWidth className={classes.mb30}>
                        <TextField id='sign-up-email' label='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value.trim())} type='text' required autoComplete='off' />
                        <div className={(errors['lastName'] !== void 0 && errors['lastName'].length) ? classes.warning : ''}>{errors['lastName']}</div>

                    </FormControl>
                    <FormControl fullWidth className={classes.mb30}>
                        <TextField id='sign-up-email' label='Email' value={email} onChange={(e) => setEmail(e.target.value.trim())} type='email' required autoComplete='off' />
                        <div className={(errors['email'] !== void 0 && errors['email'].length) ? classes.warning : ''}>{errors['email']}</div>

                    </FormControl>
                    <FormControl fullWidth className={classes.mb30}>
                        <TextField id='sign-up-password' label='Password' value={password} onChange={(e) => setPassword(e.target.value.trim())} type='password' required autoComplete='off' />
                        <div className={(errors['password'] !== void 0 && errors['password'].length) ? classes.warning : ''}>{errors['password']}</div>

                    </FormControl>
                    <FormControl className={classes.mb30}></FormControl> <Button variant="contained" disabled={(props.loading !== void 0 && props.loading === true) ? true : false} color="primary" size='large' onClick={submitData}>Submit</Button>
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

export default connect(mapStateToProps)(SingUp);
