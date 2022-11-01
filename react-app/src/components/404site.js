import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ marginLeft: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', wordBreak: 'break-word', width: '33%', flexDirection: 'column' }}>
            <h1 style={{ color: 'white' }}>HMMM this page doesn't exist head back to home?</h1>
            <NavLink to='/'>
                <button style={{ color: 'white', backgroundColor: 'black', width: '8rem', height: '3rem', borderRadius: '40px', borderColor: 'white' }}>Home</button>
            </NavLink>
        </div>
    )
}

export default NotFound;
