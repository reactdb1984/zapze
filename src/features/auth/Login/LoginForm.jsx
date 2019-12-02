import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useFirebase, useFirestore} from 'react-redux-firebase';
import {Field, reduxForm} from 'redux-form';
import {login, socialLogin} from '../authActions';
import SocialLogin from "../SocialLogin/SocialLogin";
import renderTextField from '../../../app/common/form/TextInput';

const LoginForm = ({handleSubmit, error, submitting}) => {
    const dispatch = useDispatch();
    const firebase = useFirebase();
    const firestore = useFirestore();
    const handleLogin = useCallback(
        (user) => {
            return dispatch(login({firebase}, user))
        }, [firebase, dispatch]
    );
    const handleSocialLogin = useCallback(
        (provider) => {
            return dispatch(socialLogin({firebase, firestore}, provider))
        }, [firebase, firestore, dispatch]
    );
    return (
        <form size='large' onSubmit={handleSubmit(handleLogin)} autoComplete='off'>
          
                <Field
                    name='email'
                    component={renderTextField}
                    type='text'
                    placeholder='Email Address'
                />
             
                <Field
                    name='password'
                    component={renderTextField}
                    type='password'
                    placeholder='password'
                />
                {error && <p basic color='red'>{error}</p>}
                <button loading={submitting} fluid size='large' color='teal'>
                    Login
                </button>
              
                    Or
                
                <SocialLogin socialLogin={handleSocialLogin}/>
           
        </form>
    );
};

export default reduxForm({form: 'loginForm'})(LoginForm);
