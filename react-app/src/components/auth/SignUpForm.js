import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import '../../styles/LoginForm.css'
import crow from '../../images/crow.png'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updatedFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const updatedLastName = (e) => {
    setLastName(e.target.value)
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }
  return (
    <form style={{ height: '45rem' }} className='LoginFormModal' onSubmit={onSignUp}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%', width: '50%' }}>
        <img className='imgInForm' src={crow}></img>
        <h2 style={{ fontSize: '20px' }} className='headerForLogin'>Create your account</h2>
        <div>
          {
            errors.map((error, ind) => (
              <div style={{ color: 'red' }} key={ind}>{error}</div>
            ))
          }
        </div>
        <div className='divForInputs' style={{}}>

          <div className='divAroundInputs'>
            <input
              className='inputsLogin'
              placeholder='First Name'
              type='text'
              name='firstName'
              onChange={updatedFirstName}
              value={firstName}
            ></input>
          </div>
          <div className='divAroundInputs'>
            <input
              className='inputsLogin'
              placeholder='Last Name'
              type='text'
              name='lastName'
              onChange={updatedLastName}
              value={lastName}
            ></input>
          </div>
          <div className='divAroundInputs'>
            <input
              className='inputsLogin'
              placeholder='User Name'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className='divAroundInputs'>
            <input
              className='inputsLogin'
              placeholder='Email'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='divAroundInputs'>
            <input
              className='inputsLogin'
              placeholder='Password'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='divAroundInputs'>
            <input
              className='inputsLogin'
              placeholder='Repeat Password'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
            ></input>
          </div>
        </div>
        <button className='submitButton' type='submit'>Sign Up</button>
      </div>
    </form >
  );
};

export default SignUpForm;
