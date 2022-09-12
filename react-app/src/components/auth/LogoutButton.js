import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button style={{ color: 'black', border: 'none', backgroundColor: 'white', cursor: 'pointer', height: '4em', width: '15em', borderRadius: '50px' }} onClick={onLogout}>Logout @{user.username}</button>;
};


export default LogoutButton;
