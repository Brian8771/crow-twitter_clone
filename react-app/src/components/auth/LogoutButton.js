import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button style={{ color: 'white', border: 'none', backgroundColor: 'black' }} onClick={onLogout}>Logout @{user.username}</button>;
};

export default LogoutButton;
