import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className='text-black bg-white h-12 text-sm rounded-full w-fit px-2 hover:bg-grayish transition-all duration-500' onClick={onLogout}>Logout @{user.username}</button>;
};


export default LogoutButton;
