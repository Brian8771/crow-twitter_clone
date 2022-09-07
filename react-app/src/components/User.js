import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllCaws } from '../store/caws';
import { getCurretProfile } from '../store/session';
import '../styles/Homepage.css'
import backArrow from '../images/arrow-back.svg'


function User() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { userId } = useParams();
  const user = useSelector(state => state.session.currentUserProfile);
  const caws = Object.values(useSelector(state => state.caws.caws)).filter(x => x.userId === user.id)

  useEffect(() => {
    dispatch(getCurretProfile(userId)).then(dispatch(getAllCaws())).then(() => setIsLoaded(true)).then(() => setLoaded(true))
  }, [dispatch, isLoaded, userId, loaded]);

  // if (!user) {
  //   return null;
  // }

  return (
    <div className='homePageContainer'>
      <div>
        {isLoaded &&
          <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <NavLink style={{ textDecoration: 'none' }} to='/'>
                  <img style={{ height: '20px', width: '20px', margin: '0 10px' }} src={backArrow} alt='backarrow' />
                </NavLink>
              </div>
              <div style={{ height: '3rem' }}>
                <p style={{ margin: '0', fontSize: '20px', color: 'black' }}>{user.firstName}</p>
                <p style={{ margin: '0', fontSize: '13px', color: 'black' }}>{caws.length} Caws</p>
              </div>
            </div>
            <div style={{ display: 'flex', backgroundImage: `url(${user.headerImage})`, height: '8rem', width: '100%', alignItems: 'flex-end', marginBottom: '70px' }}>
              <img style={{ marginLeft: '20px', position: 'relative', top: '60px', height: '133.5px', width: '133.5px' }} className='imgNav' src={user.profileImage} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ marginTop: '8px', marginBottom: '8px', marginLeft: '16px', color: 'black', fontSize: '20px' }}>{user.firstName}</p>
              <p style={{ marginTop: '8px', marginBottom: '8px', marginLeft: '16px', color: 'black', fontSize: '15px' }}>@{user.username}</p>
            </div>
            <div>
              <p style={{ marginLeft: '16px', color: 'black', fontSize: '15px' }}>{user.bio}</p>
            </div>
          </div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>

        {caws.length > 0 && isLoaded &&
          caws.map(caw => {
            return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: 'black .5px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', width: '100%' }}>
              <div>
                <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={caw.user.profileImage} alt='profilePic' />
              </div>
              <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                <NavLink style={{ textDecoration: 'none' }} to={`/users/${caw.user.id}`}>

                  <p className='pTag'>{caw.user.username} <span style={{ color: 'gray' }}>@{caw.user.username}</span></p>
                </NavLink>
                <NavLink style={{ textDecoration: 'none' }} to={`/${caw.id}`}>
                  <p className='pTag' >{caw.caw}</p>
                </NavLink>
              </div>

            </div>
          })
        }
        <div className='font' style={{ display: 'flex', justifyContent: 'center', borderBottom: '.5px black solid', fontSize: '15px', color: 'black' }}>
          <p >Caws</p>
        </div>
      </div>
    </div>
  );
}
export default User;
