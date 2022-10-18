import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

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
      <div key={user.id}>
        <NavLink style={{ textDecoration: 'none' }} to={`/users/${user.id}`}>
          <div className='profileDiv'>
            <div>
              <img className='imgNav' src={user.profileImage} />
            </div>
            <div style={{ marginLeft: '.5em' }}>
              <p className='userPTag'>{user.firstName}</p>
              <p className='userPTag'>@{user.username}</p>
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
        <h1>Other users on Crow </h1>
        <div>{userComponents}</div>
      </div>
    </div>
  );
}

export default UsersList;
