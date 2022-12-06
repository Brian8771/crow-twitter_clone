import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import '../../styles/LoginForm.css';
import github from '../../images/github.png';
import linkedIn from '../../images/linkedIn.png'
import logo from '../../images/logo.png';

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
    <div style={{ display: 'flex', height: '100vh', width: '100vw', flexDirection: 'row', overflowX: 'hidden', overflowY: 'hidden' }}>
      <div style={{ height: '100%', width: '60%' }}>
        <img style={{ height: '100%', width: '100%' }} src={logo}></img>
      </div>
      <div style={{ backgroundColor: 'black', height: '100%', width: '50%' }}>
        <div style={{ marginLeft: '25px' }}>
          <h1 className='font-black' style={{ fontFamily: 'TwitterChirpExtendedHeavy, Verdana, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', display: 'flex', paddingTop: '25%', width: '100%', margin: '0', fontSize: '64px' }}>Happening now</h1>
          <h2 className='font-black' style={{ marginTop: '40px', fontSize: '32px' }}>Join Crow today.</h2>
          <div>
            <SignUpFormModal />
          </div>
          <div style={{ marginTop: '30px' }}>
            <h2 className='font-black' style={{ fontSize: '17px' }}>Already have an account?</h2>
            <LoginFormModal />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '50vw', position: 'fixed', bottom: '0', right: '0', backgroundColor: 'transparent' }}>
        <a className='findMe' href='https://github.com/Brian8771'><img style={{ height: '60px', width: '60px' }} src={github} /></a>
        <a className='findMe' href='https://www.linkedin.com/in/brian-aguilar-088438247/'><img style={{ height: '60px', width: '60px', filter: 'invert(1)', borderRadius: '50%' }} src={linkedIn} /></a>
      </div>
    </div>
  );
};

export default LoginForm;
