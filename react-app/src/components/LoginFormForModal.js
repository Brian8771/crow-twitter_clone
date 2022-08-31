import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../store/session';
import '../styles/LoginForm.css'
import crow from '../images/crow.png'
import SignUpFormModal from './SignUpFormModal';


const LoginFormForModal = () => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const demoLogIn = () => {
        setEmail('demo@aa.io')
        setPassword('password')
    }

    return (
        <form className='LoginFormModal' onSubmit={onLogin}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%', width: '50%' }} >
                <img className='imgInForm' src={crow}></img>
                <h2 className='headerForLogin'>Sign in to Crow</h2>
                <div className='divAroundInputs'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='divForInputs' style={{ marginTop: '20%' }}>

                    <div >
                        {/* <label className='label' htmlFor='email'>Email</label> */}
                        <input
                            className='inputsLogin'
                            name='email'
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={updateEmail}
                        />
                    </div>
                    <div className='divAroundInputs'>
                        {/* <label htmlFor='password'>Password</label> */}
                        <input
                            className='inputsLogin'
                            name='password'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={updatePassword}
                        />
                    </div>
                    <div className='divAroundInputs' style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className='submitButton' type='submit'>Login</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p>Don't Have an account?</p>
                    </div>
                    <div className='divAroundInputs' style={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={() => demoLogIn()} className='submitButton' >Demo User</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default LoginFormForModal
