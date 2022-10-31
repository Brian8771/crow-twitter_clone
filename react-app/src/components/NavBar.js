
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../styles/Homepage.css'
import crow from '../images/crow.png'
import { useSelector } from 'react-redux';
import dots from '../images/3dots.svg';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const [showDiv, setShowDiv] = useState(false);



  return (
    <nav className='navBar'>
      <div style={{ width: '40%', height: '30%', marginTop: '1em' }}>
        <NavLink to='/'>
          <img className='imgNav' style={{ height: '30px', width: '30px' }} src={crow} alt='crow-icon' />
        </NavLink>
      </div>

      <div style={{ width: '40%', display: 'flex', alignItems: 'flex-start', height: '60%' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className='navDiv'>
            <NavLink className='navLinks' style={{ marginLeft: '10px' }} to='/' exact={true} activeClassName='active'>
              <div className='svgDiv'>
                <svg className='svgNav'>
                  <g ><path fill='white' d="M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"></path></g>
                </svg>
                <div style={{ padding: '0 6px' }}>
                  Home
                </div>
              </div>
            </NavLink>
          </div>
          {/* <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li> */}
          {/* <div className='navDiv'>
            <NavLink className='navLinks' to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div> */}
          <div className='navDiv' >
            <NavLink className='navLinks' to={`/users/${user.id}`}>
              <div className='svgDiv'>
                <svg className='svgNav'>
                  <g><path fill='white' d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path></g></svg>
                Profile
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '40%', height: '30%', alignItems: 'flex-end', marginBottom: '1.5em' }} >
        <div style={{ width: '100%' }}>

          {<div style={{marginBottom: '.5rem'}} className={showDiv ? 'show' : 'dont'} >
            {/* <div >
              <img className='imgNav' src={user.profileImage} alt='profile pic' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginRight: '7px' }}>
                <p style={{ color: 'black' }} className='pTag'>{user.firstName}</p>
                <p style={{ color: 'black' }} className='pTag'>@{user.username}</p>
              </div>
              <div>
              </div>
            </div> */}
            <LogoutButton />
          </div>}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginRight: '6px' }}>
              <img className='imgNav' src={user.profileImage} alt='profile pic' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginRight: '7px' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ color: 'white' }} className='pTag'>{user.firstName}</p>
                </div>
                <p style={{ color: 'grey' }} className='pTag'>@{user.username}</p>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <button className='showButton' onClick={() => setShowDiv(!showDiv)}>
                    <img style={{ height: '6px', width: '6px ' }} src={dots} alt='3dots' />
                    <img style={{ height: '6px', width: '6px ' }} src={dots} alt='3dots' />
                    <img style={{ height: '6px', width: '6px ' }} src={dots} alt='3dots' />
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
