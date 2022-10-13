import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllCaws, likeCawThunk } from '../store/caws';
import { followUser, getCurretProfile, getFollowers, getFollowings, unfollowUser } from '../store/session';
import '../styles/Homepage.css'
import backArrow from '../images/arrow-back.svg'
import comment from '../images/comment.png';
import likeIcon from '../images/like.png';
import likedIcon from '../images/liked.png'
import EditUserModal from './EditUserModal';
import UserFollowersModal from './UserFollowersModal';
import UserFollowingsModal from './UserFollowingsModal';



function User() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [option, setOption] = useState('Caws');
  const { userId } = useParams();
  const user = useSelector(state => state.session.currentUserProfile);
  const caws = Object.values(useSelector(state => state.caws.caws)).filter(x => x.userId === user.id)
  const allCaws = Object.values(useSelector(state => state.caws.caws))
  const session = useSelector(state => state.session.user);

  const getLikedCaws = () => {
    let arr = []
    for (let caw of user.like_caws) {
      arr.push(caw.id)
    }
    let cawsNeeded = []
    for (let caw of allCaws) {
      if (arr.includes(caw.id)) cawsNeeded.push(caw)
    }
    return cawsNeeded
  }

  // console.log(getLikedCaws());

  const handleLikes = async (id) => {
    await dispatch(likeCawThunk(id))
    setLoaded(false)
    await getAllCaws()
    setLoaded(true)

  }

  const ifFollows = () => {
    const follows = user.followers
    let arr = []
    for (let follow of follows) {
      arr.push(follow.id)
    }
    if (arr.includes(session.id)) {
      return true
    }
    return false;
  }

  const followingUser = async () => {
    await dispatch(followUser(user.username))
    // await setRefresh(false)
    // await dispatch(getCurretProfile(userId))
    // await setRefresh(true)
  }

  const unfollowingUser = async () => {
    await dispatch(unfollowUser(user.username))
    // await setRefresh(false)
    // await dispatch(getCurretProfile(userId))
    // await setRefresh(true)
  }

  useEffect(() => {
    dispatch(getCurretProfile(userId)).then(dispatch(getAllCaws())).then(() => setIsLoaded(true)).then(() => setOption('Caws')).then(() => setLoaded(true))
  }, [dispatch, isLoaded, userId, loaded, EditUserModal]);

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
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ marginTop: '8px', marginBottom: '8px', marginLeft: '16px', color: 'black', fontSize: '20px' }}>{user.firstName}</p>
                <p style={{ marginTop: '8px', marginBottom: '8px', marginLeft: '16px', color: 'black', fontSize: '15px' }}>@{user.username}</p>
              </div>

              {session.id == user.id ? <div style={{ display: 'flex', width: '20%', marginRight: '8px', flexDirection: 'row' }}>
                <EditUserModal setLoaded={setLoaded} />
              </div> :
                <div style={{ display: 'flex', width: '20%', marginRight: '8px', flexDirection: 'row' }}>
                  {!ifFollows() && refresh ? <button onClick={() => followingUser(user.username)} style={{ color: 'black', backgroundColor: 'white', padding: '0', margin: '0', height: '30%', width: '90%', borderRadius: '40px', cursor: 'pointer' }}>Follow</button> : <button onClick={() => unfollowingUser(user.username)} style={{ color: 'white', backgroundColor: 'black', padding: '0', margin: '0', height: '30%', width: '90%', borderRadius: '40px', cursor: 'pointer' }}>Unfollow</button>}
                </div>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <p style={{ marginLeft: '16px', color: 'black', fontSize: '15px', width: '100%', wordBreak: 'break-word', paddingRight: '6px' }}>{user.bio}</p>
            </div>
            {<div style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
              <UserFollowingsModal id={user.id} totalFollowings={user.followingCount} />
              <UserFollowersModal id={user.id} totalFollowers={user.followerCount} />
            </div>}
          </div>}
      </div>
      <div className='font' style={{ display: 'flex', justifyContent: 'space-around', borderBottom: '.5px black solid', fontSize: '15px', color: 'black' }}>
        <p style={{ cursor: 'pointer' }} className={option === 'Caws' ? 'activated' : ''} onClick={() => setOption('Caws')}>Caws</p>
        <p style={{ cursor: 'pointer' }} className={option === 'Likes' ? 'activated' : ''} onClick={() => setOption('Likes')}>Likes</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column-reverse', width: '100%' }}>

        {option === 'Caws' && caws.length > 0 && isLoaded &&
          caws.map(caw => {
            return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: 'black .5px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', width: '96.8%' }}>
              <div>
                <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={caw.user.profileImage} alt='profilePic' />
              </div>
              <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                <NavLink style={{ textDecoration: 'none' }} to={`/users/${caw.user.id}`}>

                  <p className='pTag'>{caw.user.username} <span style={{ color: 'gray' }}>@{caw.user.username}</span></p>
                </NavLink>
                <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
                  <p className='pTag' style={{ paddingTop: '10px', width: '100%', marginRight: '0' }} >{caw.caw}</p>
                </NavLink>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                  <div onClick={() => handleLikes(caw.id)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {caw.likeStatus === 1 ?
                      <img src={likedIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                      :
                      <img src={likeIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                    }
                    <p style={{ marginLeft: '8px', color: 'black', cursor: 'pointer' }}>{caw.totalLikes}</p>
                  </div>
                  <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0px', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <img style={{ height: '16px', backgroundColor: 'white' }} src={comment} alt='comment' />
                      <p style={{ marginLeft: '8px', color: 'black' }}>{caw.totalComments}</p>
                    </div>
                  </NavLink>
                </div>
              </div>

            </div>
          })
        }
        {option === 'Likes' && user.like_caws && isLoaded &&
          getLikedCaws().map(caw => {
            return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: 'black .5px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', width: '96.8%' }}>
              <div>
                <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={caw.user.profileImage} alt='profilePic' />
              </div>
              <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                <NavLink style={{ textDecoration: 'none' }} to={`/users/${caw.user.id}`}>

                  <p className='pTag'>{caw.user.username} <span style={{ color: 'gray' }}>@{caw.user.username}</span></p>
                </NavLink>
                <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
                  <p className='pTag' style={{ paddingTop: '10px', width: '100%', marginRight: '0' }} >{caw.caw}</p>
                </NavLink>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                  <div onClick={() => handleLikes(caw.id)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {caw.likeStatus === 1 ?
                      <img src={likedIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                      :
                      <img src={likeIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                    }
                    <p style={{ marginLeft: '8px', color: 'black', cursor: 'pointer' }}>{caw.totalLikes}</p>
                  </div>
                  <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0px', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <img style={{ height: '16px', backgroundColor: 'white' }} src={comment} alt='comment' />
                      <p style={{ marginLeft: '8px', color: 'black' }}>{caw.totalComments}</p>
                    </div>
                  </NavLink>
                </div>
              </div>

            </div>
          })
        }

      </div>
    </div >
  );
}
export default User;
