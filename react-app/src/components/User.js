import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllCaws, likeCawThunk } from '../store/caws';
import { followUser, getCurretProfile, unfollowUser } from '../store/session';
import '../styles/Homepage.css'
import backArrow from '../images/arrow-back.svg'
import { likeCommentThunk } from '../store/comments';
import EditUserModal from './EditUserModal';
import UserFollowersModal from './UserFollowersModal';
import UserFollowingsModal from './UserFollowingsModal';
import { getAllCommentsByUserId } from '../store/comments';
import ClipLoader from "react-spinners/ClipLoader";
import Caw from './Caw';
import Comment from './Comment';


function User() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [option, setOption] = useState('');
  const [loader, setLoader] = useState(false);
  const { userId } = useParams();
  const user = useSelector(state => state.session.currentUserProfile);
  const caws = Object.values(useSelector(state => state.caws.caws)).filter(x => x.userId === user.id);
  const comments = Object.values(useSelector(state => state.comments.comments)).filter(x => x.userid === user.id);
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
  }

  const unfollowingUser = async () => {
    await dispatch(unfollowUser(user.username))
  }

  const option1 = caws.length > 0 && isLoaded &&
    caws.map(caw => {
      return <Caw caw={caw} setLoaded={setLoaded} />
    })

  const option2 = (user.like_caws.length && isLoaded) ?
    getLikedCaws().map(caw => {
      return <Caw caw={caw} setLoaded={setLoaded} />
    }) : <div className='flex justify-center mt-4'>
      <h1 className='mt-3 text-3xl font-black'>No Likes Here</h1>
    </div>

  const option3 = (comments && isLoaded) ?
    comments.map(comment => {
      return <Comment comment={comment} setRefresh={setRefresh} userId={userId} />
    }) : <div className='flex justify-center mt-4'>
      <h1 className='mt-3 text-3xl font-black'>No Comments Here</h1>
    </div>


  useMemo(() => {
    setOption('Caws')
    getCurretProfile(userId)
  }, [userId])

  useEffect(() => {
    setLoader(true)
    dispatch(getCurretProfile(userId)).then(dispatch(getAllCaws())).then(dispatch(getAllCommentsByUserId(userId))).then(() => setIsLoaded(true)).then(() => setLoaded(true)).then(setLoader(false))
  }, [dispatch, isLoaded, userId, loaded, EditUserModal]);

  return (
    <>
      {loader ?
        <div className='homePageContainer' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <ClipLoader
            color='white'
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        :
        <>
          <div className='homePageContainer'>
            {isLoaded &&
              <>
                <div className='pb-1.5 pt-4 sticky top-0 z-10 flex' style={{ backgroundColor: 'rgba(0 0 0 / .85)' }}>
                  <div className='flex justify-center items-center'>
                    <NavLink className='no-underline' to='/'>
                      <img className=' h-5 w-5 mx-0 my-[10px]' src={backArrow} alt='backarrow' />
                    </NavLink>
                  </div>
                  <div className='h-12 ml-6'>
                    <p className='m-0 text-white text-xl '>{user.firstName}</p>
                    <p className='m-0 text-sm' style={{ color: 'gray' }}> {caws.length} Caws</p>
                  </div>
                </div>
                <div style={{ marginBottom: '1em' }}>
                  <div>
                    <div className='relative mb-24'>
                      <img className='h-40 w-full object-cover' src={user.headerImage} alt='header image' />
                      <img className='absolute h-36 w-36 object-cover rounded-full  top-[5.5rem] left-6' style={{ border: '4px solid black' }} src={user.profileImage} />
                    </div>
                    <div className='flex justify-between w-full'>
                      <div className='flex flex-col'>
                        <p className='my-2 ml-4 text-xl'>{user.firstName}</p>
                        <p className='mb-2 ml-[15px] text-[15px]' style={{ color: 'grey' }}>@{user.username}</p>
                      </div>

                      {session.id == user.id ? <div className='flex w-1/5 mr-2'>
                        <EditUserModal setLoaded={setLoaded} />
                      </div> :
                        <div className='flex w-1/5 mr-2'>
                          {!ifFollows() && refresh ? <button className='followButton' onClick={() => followingUser(user.username)}>Follow</button> : <button className='unfollowButton' onClick={() => unfollowingUser(user.username)} >Unfollow</button>}
                        </div>}
                    </div>
                    <div className='flex w-full'>
                      <p className='ml-4 text-white text-[15px] w-full pr-[6px]' style={{ wordBreak: 'break-word' }}>{user.bio}</p>
                    </div>
                    {<div className='mt-3 flex w-full'>
                      <UserFollowingsModal id={user.id} totalFollowings={user.followingCount} />
                      <UserFollowersModal id={user.id} totalFollowers={user.followerCount} />
                    </div>}
                  </div>
                </div>
              </>}
            {!loader && user && <div className='font flex text-[15px] text-black' style={{ borderBottom: '#2f3336 1px solid' }}>
              <p className={option === 'Caws' ? 'activated' : 'notActivated'} onClick={() => setOption('Caws')}>Caws</p>
              <p className={option === 'Comments' ? 'activated' : 'notActivated'} onClick={() => setOption('Comments')}>Replies</p>
              <p className={option === 'Likes' ? 'activated' : 'notActivated'} onClick={() => setOption('Likes')}>Likes</p>
            </div>}
            <div className='flex flex-col-reverse w-full'>

              {option === 'Caws' && option1}
              {option === 'Likes' && option2}
              {option === 'Comments' && option3
              }

            </div>
          </div >
        </>
      }
    </>
  );
}
export default User;
