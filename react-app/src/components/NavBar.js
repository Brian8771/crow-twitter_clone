
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../styles/Homepage.css'
import crow from '../images/logo.png'
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const [showDiv, setShowDiv] = useState(false);



  document.addEventListener('click', function handleClickOutsideBox(event) {
    const box = document.getElementsByClassName('profileButton');
    const show = document.getElementsByClassName('show');

    if (box[0].contains(event.target)) {
      show[0].style.visibility = 'visible'
    }
    if (!box[0].contains(event.target)) {
      show[0].style.visibility = 'hidden';
    }
  });



  return (
    <nav className='navBar'>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '52%' }}>

        <div className='p-3 logo-img ' style={{ width: '40%', height: '30%', marginTop: '1em' }}>
          <NavLink to='/'>
            <img className='h-12 w-12 hover:animate-pulse' style={{ height: '40px', width: '40px' }} src={crow} alt='crow-icon' />
          </NavLink>
        </div>

        <div style={{ width: '40%', display: 'flex', alignItems: 'flex-start', height: '60%' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='py-2 px-2 navDiv'>
              <NavLink className='navLinks flex align-baseline' to='/' exact={true} activeClassName='active'>
                <div className='flex justify-center'>
                  <div className='flex justify-center items-center'>
                    <svg className='h-7 w-7 m-0'>
                      <g ><path fill='white' d="M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"></path></g>
                    </svg>
                  </div>
                  <div style={{ padding: '0 6px' }}>
                    <p>Home</p>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className='mt-2 py-2 px-2 navDiv' >
              <NavLink className='navLinks flex align-baseline' to={`/users/${user.id}`}>
                <div className='flex justify-center'>
                  <div className='flex justify-center items-center'>
                    <svg className='h-7 w-7 m-0'>
                      <g><path fill='white' d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path></g></svg>
                  </div>
                  <div style={{ padding: '0 6px' }}>
                    <p>Profile</p>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', height: '30%', alignItems: 'flex-end', marginBottom: '1.5em' }} >
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

            {<div style={{ marginBottom: '.5rem' }} className='show' >
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
            <div className='profileButton' onClick={() => setShowDiv(!showDiv)}>
              <div style={{ marginRight: '6px' }}>
                <img className='h-9 w-9 rounded-full border-4 border-black mt-1' src={user.profileImage} alt='profile pic' />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginRight: '7px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ color: 'white' }} className='pTag'>{user.firstName}</p>
                  </div>
                  <p style={{ color: 'grey' }} className='pTag'>@{user.username}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button className='showButton' >
                    <svg fill='white' height='20px' viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
