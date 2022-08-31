
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../styles/Homepage.css'

const NavBar = () => {
  return (
    <nav className='navBar'>
      <div style={{ width: '30%' }}>
        <img style={{ height: '30px', width: '30px' }} src='https://www.kindpng.com/picc/m/347-3478772_bird-gray-black-crow-twitter-bird-icon-png.png' alt='crow-icon' />
      </div>
      <div style={{ width: '30%', display: 'flex', alignItems: 'flex-start' }}>
        <ul style={{ display: 'flex', flexDirection: 'column' }}>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
