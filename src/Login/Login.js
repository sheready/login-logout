import {React, useState, useEffect, useReducer} from 'react'
import classes from './Login.css';
import Card from '../Card';

const emailReducer = (state, action) => {
  if(action.type === 'user_input'){
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type === 'input_blur'){
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value : '', isValid: false}
}

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    // syntax: const[state, dispatchFn] = useReducer(ReducerFn, initialState, initFn);
        
    const [emailState, dispatchEmail] = useReducer(emailReducer, 
        {value : '', isValid: false}
      );
    
    
        // useEffect(() => {
    //   console.log('Im triggered')
    //   setFormIsValid(
    //     enteredEmail.includes('@') && enteredPassword.trim().length > 6
    //   );
    // },[enteredEmail, enteredPassword])

      const emailChangeHandler = (event) => {
       dispatchEmail({type: 'user_input', val: event.target.value})

        setFormIsValid(
              event.target.value.include('@') && enteredPassword.trim().length > 6
            );

        
      };

    
      const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);

        setFormIsValid(
              emailState.isValid && enteredPassword.trim().length > 6
            );

        
      };
    
      const validateEmailHandler = () => {
        dispatchEmail({type: 'input_blur'})
      };
    
      const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
      };
    
      const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, enteredPassword);
      };

  return (
    <Card className={classes.login}>
        <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </button>
        </div>
      </form>
    </Card>
  )
}

export default Login