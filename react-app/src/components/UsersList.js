import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import github from '../images/github.png';
import linkedIn from '../images/linkedIn.png';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const sessionUser = useSelector(state => state.session.user)
  let allUsers = [];
  if (sessionUser) {
    allUsers = users.filter(x => x.id !== sessionUser.id);

  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = allUsers.map((user) => {
    // if (user.id !== sessionUser.id) {
    return (
      <div style={{ width: '100%' }} key={user.id}>
        <NavLink style={{ textDecoration: 'none' }} to={`/users/${user.id}`}>
          <div className='profileDiv'>
            <div>
              <img style={{ border: 'none', height: '48px', width: '48px' }} className='imgNav' src={user.profileImage} />
            </div>
            <div style={{ marginLeft: '.5em' }}>
              <p className='userPTag firstNameP'>{user.firstName}</p>
              <p style={{ color: '#808080' }} className='userPTag'>@{user.username}</p>
            </div>
          </div>
        </NavLink>
      </div>
    );

    // }
  });

  return (
    <div className='userList' >
      <div>
        <svg style={{ position: 'absolute', top: '14px', left: '6px' }} height='20px' viewBox="0 0 24 24" aria-hidden="true" class="r-1bwzh9t r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"><g><path fill='black' d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
        <input
          type='text'
          className='inputSearch'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className='userListDiv'>
        <div>
          <h1 style={{ fontSize: '20px' }}>Other users on Crow </h1>
          <div>{userComponents}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '30vw', position: 'fixed', bottom: '0', right: '0', backgroundColor: 'transparent' }}>
          <a className='findMe' href='https://github.com/Brian8771'><img style={{ height: '60px', width: '60px' }} src={github} /></a>
          <a className='findMe' href='https://www.linkedin.com/in/brian-aguilar-088438247/'><img style={{ height: '60px', width: '60px', borderRadius: '50%', filter: 'invert(1)' }} src={linkedIn} /></a>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
