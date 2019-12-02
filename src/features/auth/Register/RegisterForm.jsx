import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useFirebase, useFirestore} from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import {registerUser} from "../authActions";
import renderTextField from '../../../app/common/form/TextInput';

const RegisterForm = ({handleSubmit}) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const handleregister = useCallback(
      (user) => {
        dispatch(registerUser({firebase, firestore}, user))
      }, [firebase, firestore, dispatch]
  );
  return (
    <div>
      <form size="large" autoComplete='off' onSubmit={handleSubmit(handleregister)}>
       
          <Field
            name="displayName"
            type="text"
            component={renderTextField}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={renderTextField}
            placeholder="Email"
          />
          <Field
            name="password"
            autoComplete="new-password"
            type="password"
            component={renderTextField}
            placeholder="Password"
          />
          <button fluid size="large" color="teal">
            Register
          </button>
     
      </form>
    </div>
  );
};

export default reduxForm({form: 'registerForm'})(RegisterForm);