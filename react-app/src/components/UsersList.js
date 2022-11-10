import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import github from '../images/github.png';
import linkedIn from '../images/linkedIn.png';

function UsersList() {
  const [users, setUsers] = useState([]);
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
              <img className='imgNav' src={user.profileImage} />
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
