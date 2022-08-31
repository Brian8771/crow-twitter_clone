import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import '../../styles/LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', flexDirection: 'row' }}>
      <div style={{ height: '100%', width: '60%' }}>
        <img style={{ height: '100%', width: '100%' }} src='https://www.kindpng.com/picc/m/347-3478772_bird-gray-black-crow-twitter-bird-icon-png.png'></img>
      </div>
      <div style={{ backgroundColor: 'black', height: '100%', width: '50%' }}>
        <div style={{ marginLeft: '25px' }}>
          <h1 style={{ fontFamily: 'TwitterChirpExtendedHeavy, Verdana, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', display: 'flex', paddingTop: '25%', width: '100%', margin: '0', fontSize: '64px' }}>Happening now</h1>
          <h2 style={{ marginTop: '40px', fontSize: '32px' }}>Join Crow today.</h2>
          <div>
            <SignUpFormModal />
          </div>
          <div style={{ marginTop: '30px' }}>
            <h2 style={{ fontSize: '17px' }}>Already have an account?</h2>
            <LoginFormModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
