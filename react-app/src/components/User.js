import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllCaws, likeCawThunk } from '../store/caws';
import { followUser, getCurretProfile, unfollowUser } from '../store/session';
import '../styles/Homepage.css'
import backArrow from '../images/arrow-back.svg'
import likedIcon from '../images/liked.png'
import { likeCommentThunk } from '../store/comments';
import EditUserModal from './EditUserModal';
import UserFollowersModal from './UserFollowersModal';
import UserFollowingsModal from './UserFollowingsModal';
import { getAllCommentsByUserId } from '../store/comments';
import ClipLoader from "react-spinners/ClipLoader";
import Caw from './Caw';


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

  const handleCommentLikes = async (commentId) => {
    await dispatch(likeCommentThunk(commentId))
    setRefresh(false)
    await getAllCommentsByUserId(userId)
    setRefresh(true)
  }

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

  const timeAfterCreated = (caw) => {
    const age = Date.now() - Date.parse(caw.createdAt);
    let res;
    const second = Math.floor(age / 1000)
    const minute = Math.floor(second / 60);
    const hour = Math.floor(minute / 60);
    const day = Math.floor(hour / 24);
    const week = Math.floor(day / 7)
    if (week > 0) {
      res = caw.createdAt.split(', '[1])[2] + ' ' + caw.createdAt.split(', '[1])[1]
    }
    else if (day > 0) {
      res = caw.createdAt.split(', '[1])[2] + ' ' + caw.createdAt.split(', '[1])[1]
    }
    else if (hour > 0) {
      res = `${hour}h`
    }
    else if (minute > 0) {
      res = `${minute}m`
    }
    else {
      res = `${second}s`
    }

    return res
  }

  const followingUser = async () => {
    await dispatch(followUser(user.username))
  }

  const unfollowingUser = async () => {
    await dispatch(unfollowUser(user.username))
  }

  const option1 = caws.length > 0 && isLoaded &&
    caws.map(caw => {
      return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: '#2f3336 1px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', width: '100%' }}>
        <div className='px-2.5 py-1.5 mr-3'>
          <img className='h-12 w-12 rounded-full object-cover' src={caw.user.profileImage} alt='profilePic' />
        </div>
        <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
          <NavLink style={{ textDecoration: 'none' }} to={`/users/${caw.user.id}`}>

            <p style={{ color: 'white' }} className='pTag'><span className='firstNameP'>{caw.user.firstName}</span> <span style={{ color: 'gray' }}>@{caw.user.username}</span><span style={{ marginLeft: '6px', color: 'gray' }}>{timeAfterCreated(caw)}</span></p>
          </NavLink>
          <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
            <p className='pTag' style={{ paddingTop: '10px', width: '100%', marginRight: '0', color: 'white' }} >{caw.caw}</p>
            {caw.image && <img className='cawImage mb-2 aspect-square' src={caw.image} alt='image' />}
          </NavLink>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div className='likeButton' onClick={() => handleLikes(caw.id)} >
              {caw.likeStatus === 1 ?
                <div className='svgContainer'>
                  <img src={likedIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                </div>
                :
                <div className='svgContainer'>
                  <svg className='svgHeart' height="16px" viewBox="0 0 93 87" >
                    <path d="M46.0625 86.6892H45.9983C34.1596 86.4692 0 55.605 0 26.3725C0 12.3292 11.5729 0 24.7637 0C35.2596 0 42.3179 7.24167 46.0579 12.5125C49.7887 7.25083 56.8471 0 67.3475 0C80.5475 0 92.1158 12.3292 92.1158 26.3771C92.1158 55.6004 57.9517 86.4646 46.1129 86.68H46.0625V86.6892ZM24.7683 6.87958C15.235 6.87958 6.87958 15.9912 6.87958 26.3817C6.87958 52.69 39.1187 79.53 46.0671 79.8142C53.0246 79.53 85.2546 52.6946 85.2546 26.3817C85.2546 15.9912 76.8992 6.87958 67.3658 6.87958C55.7792 6.87958 49.3075 20.3362 49.2525 20.4692C48.1983 23.045 43.9542 23.045 42.8954 20.4692C42.8312 20.3317 36.3642 6.87958 24.7729 6.87958H24.7683Z" />
                  </svg>
                </div>
              }
              {caw.likeStatus === 1 ?
                <p style={{ marginLeft: '12px', cursor: 'pointer', color: '#f9197f' }}>{caw.totalLikes}</p> :
                <p className='numberOfLikes'>{caw.totalLikes}</p>
              }
            </div>
            <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
              <div className='commentButton' >
                <div className='svgContainer'>
                  <svg className='svgComment' height="20px" viewBox="0 0 140 140" >
                    <path d="M81.935 13.0783L57.7383 13.02H57.7267C32.2117 13.02 12.2267 33.0108 12.2267 58.5317C12.2267 82.4367 30.8117 100.567 55.7725 101.523V123.853C55.7725 124.483 56.0292 125.522 56.4725 126.204C57.3008 127.517 58.7125 128.228 60.1592 128.228C60.9642 128.228 61.775 128.007 62.5042 127.54C64.0442 126.56 100.263 103.39 109.684 95.4217C120.779 86.03 127.418 72.2633 127.435 58.6017V58.5025C127.4 33.0283 107.427 13.0783 81.935 13.0725V13.0783ZM104.026 88.7483C97.4108 94.3483 75.6642 108.611 64.5225 115.833V97.2417C64.5225 94.8267 62.5683 92.8667 60.1475 92.8667H57.8375C36.4875 92.8667 20.9825 78.4233 20.9825 58.5317C20.9825 37.9167 37.1292 21.77 57.7325 21.77L81.9233 21.8283H81.935C102.538 21.8283 118.685 37.9633 118.697 58.555C118.679 69.6967 113.202 80.9783 104.032 88.7483H104.026Z" />
                  </svg>
                </div>
                <p className='totalComments'>{caw.totalComments}</p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    })

  useMemo(() => {
    setOption('Caws')
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
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <NavLink style={{ textDecoration: 'none' }} to='/'>
                      <img style={{ height: '20px', width: '20px', margin: '0 10px' }} src={backArrow} alt='backarrow' />
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p style={{ marginTop: '8px', marginBottom: '8px', marginLeft: '16px', color: 'white', fontSize: '20px' }}>{user.firstName}</p>
                        <p style={{ marginBottom: '8px', marginLeft: '15px', color: 'grey', fontSize: '15px' }}>@{user.username}</p>
                      </div>

                      {session.id == user.id ? <div style={{ display: 'flex', width: '20%', marginRight: '8px', flexDirection: 'row' }}>
                        <EditUserModal setLoaded={setLoaded} />
                      </div> :
                        <div style={{ display: 'flex', width: '20%', marginRight: '8px', flexDirection: 'row' }}>
                          {!ifFollows() && refresh ? <button className='followButton' onClick={() => followingUser(user.username)}>Follow</button> : <button className='unfollowButton' onClick={() => unfollowingUser(user.username)} >Unfollow</button>}
                        </div>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                      <p style={{ marginLeft: '16px', color: 'white', fontSize: '15px', width: '100%', wordBreak: 'break-word', paddingRight: '6px' }}>{user.bio}</p>
                    </div>
                    {<div className='mt-3' style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
                      <UserFollowingsModal id={user.id} totalFollowings={user.followingCount} />
                      <UserFollowersModal id={user.id} totalFollowers={user.followerCount} />
                    </div>}
                  </div>
                </div>
              </>}
            {!loader && user && <div className='font' style={{ display: 'flex', borderBottom: '#2f3336 1px solid', fontSize: '15px', color: 'black' }}>
              <p className={option === 'Caws' ? 'activated' : 'notActivated'} onClick={() => setOption('Caws')}>Caws</p>
              <p className={option === 'Comments' ? 'activated' : 'notActivated'} onClick={() => setOption('Comments')}>Replies</p>
              <p className={option === 'Likes' ? 'activated' : 'notActivated'} onClick={() => setOption('Likes')}>Likes</p>
            </div>}
            <div style={{ display: 'flex', flexDirection: 'column-reverse', width: '100%' }}>

              {option === 'Caws' && option1
              }
              {option === 'Likes' && user.like_caws.length > 0 && isLoaded &&
                getLikedCaws().map(caw => {
                  return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: '#2f3336 1px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', width: '100%' }}>
                    <div className='px-2.5 py-1.5 mr-3'>
                      <img className='h-12 w-12 rounded-full object-cover' src={caw.user.profileImage} alt='profilePic' />
                    </div>
                    <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                      <NavLink style={{ textDecoration: 'none' }} to={`/users/${caw.user.id}`}>

                        <p style={{ color: 'white' }} className='pTag'><span className='firstNameP'>{caw.user.firstName}</span> <span style={{ color: 'gray' }}>@{caw.user.username}</span><span style={{ marginLeft: '6px', color: 'gray' }}>{timeAfterCreated(caw)}</span></p>
                      </NavLink>
                      <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
                        <p className='pTag' style={{ paddingTop: '10px', width: '100%', marginRight: '0', color: 'white' }} >{caw.caw}</p>
                        {caw.image && <img className='cawImage aspect-square mb-2' src={caw.image} alt='image' />}
                      </NavLink>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <div className='likeButton' onClick={() => handleLikes(caw.id)}>
                          {caw.likeStatus === 1 ?
                            <div className='svgContainer'>
                              <img src={likedIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                            </div>
                            :
                            <div className='svgContainer'>
                              <svg className='svgHeart' height="16px" viewBox="0 0 93 87" >
                                <path d="M46.0625 86.6892H45.9983C34.1596 86.4692 0 55.605 0 26.3725C0 12.3292 11.5729 0 24.7637 0C35.2596 0 42.3179 7.24167 46.0579 12.5125C49.7887 7.25083 56.8471 0 67.3475 0C80.5475 0 92.1158 12.3292 92.1158 26.3771C92.1158 55.6004 57.9517 86.4646 46.1129 86.68H46.0625V86.6892ZM24.7683 6.87958C15.235 6.87958 6.87958 15.9912 6.87958 26.3817C6.87958 52.69 39.1187 79.53 46.0671 79.8142C53.0246 79.53 85.2546 52.6946 85.2546 26.3817C85.2546 15.9912 76.8992 6.87958 67.3658 6.87958C55.7792 6.87958 49.3075 20.3362 49.2525 20.4692C48.1983 23.045 43.9542 23.045 42.8954 20.4692C42.8312 20.3317 36.3642 6.87958 24.7729 6.87958H24.7683Z" />
                              </svg>
                            </div>
                          }
                          {caw.likeStatus === 1 ?
                            <p style={{ marginLeft: '12px', cursor: 'pointer', color: '#f9197f' }}>{caw.totalLikes}</p> :
                            <p className='numberOfLikes'>{caw.totalLikes}</p>
                          }
                        </div>
                        <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
                          <div className='commentButton' >
                            <div className='svgContainer'>
                              <svg className='svgComment' height="20px" viewBox="0 0 140 140" >
                                <path d="M81.935 13.0783L57.7383 13.02H57.7267C32.2117 13.02 12.2267 33.0108 12.2267 58.5317C12.2267 82.4367 30.8117 100.567 55.7725 101.523V123.853C55.7725 124.483 56.0292 125.522 56.4725 126.204C57.3008 127.517 58.7125 128.228 60.1592 128.228C60.9642 128.228 61.775 128.007 62.5042 127.54C64.0442 126.56 100.263 103.39 109.684 95.4217C120.779 86.03 127.418 72.2633 127.435 58.6017V58.5025C127.4 33.0283 107.427 13.0783 81.935 13.0725V13.0783ZM104.026 88.7483C97.4108 94.3483 75.6642 108.611 64.5225 115.833V97.2417C64.5225 94.8267 62.5683 92.8667 60.1475 92.8667H57.8375C36.4875 92.8667 20.9825 78.4233 20.9825 58.5317C20.9825 37.9167 37.1292 21.77 57.7325 21.77L81.9233 21.8283H81.935C102.538 21.8283 118.685 37.9633 118.697 58.555C118.679 69.6967 113.202 80.9783 104.032 88.7483H104.026Z" />
                              </svg>
                            </div>
                            <p className='totalComments'>{caw.totalComments}</p>
                          </div>
                        </NavLink>
                      </div>
                    </div>

                  </div>
                })
              }

              {option === 'Likes' && user.like_caws.length === 0 && isLoaded &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                  <h1 className='mt-3 text-3xl font-black'>No Likes Here</h1>
                </div>
              }

              {option === 'Comments' && comments && isLoaded &&
                comments.map(comment => {
                  return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: '#2f3336 1px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', width: '100%' }}>
                    <div className='px-2.5 py-1.5 mr-3'>
                      <img className='h-12 w-12 rounded-full object-cover' src={comment.user.profileImage} alt='profilePic' />
                    </div>
                    <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                      <NavLink style={{ textDecoration: 'none' }} to={`/users/${comment.userId}`}>

                        <p style={{ color: 'white' }} className='pTag'><span className='firstNameP'>{comment.user.firstName}</span> <span style={{ color: 'gray' }}>@{comment.caw.username}</span><span style={{ marginLeft: '6px', color: 'gray' }}>{timeAfterCreated(comment)}</span></p>
                      </NavLink>
                      <NavLink style={{ textDecoration: 'none' }} to={`/caw/${comment.caw.id}`}>
                        <p className='pTag' style={{ paddingTop: '10px', width: '100%', marginRight: '0', color: 'white' }} >{comment.data}</p>
                      </NavLink>
                      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div className='likeButton' onClick={() => handleCommentLikes(comment.id)}>
                          {comment.likeStatus === 1 ?
                            <div className='svgContainer'>
                              <img src={likedIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                            </div>
                            :
                            <div className='svgContainer'>
                              <svg className='svgHeart' height="16px" viewBox="0 0 93 87" >
                                <path d="M46.0625 86.6892H45.9983C34.1596 86.4692 0 55.605 0 26.3725C0 12.3292 11.5729 0 24.7637 0C35.2596 0 42.3179 7.24167 46.0579 12.5125C49.7887 7.25083 56.8471 0 67.3475 0C80.5475 0 92.1158 12.3292 92.1158 26.3771C92.1158 55.6004 57.9517 86.4646 46.1129 86.68H46.0625V86.6892ZM24.7683 6.87958C15.235 6.87958 6.87958 15.9912 6.87958 26.3817C6.87958 52.69 39.1187 79.53 46.0671 79.8142C53.0246 79.53 85.2546 52.6946 85.2546 26.3817C85.2546 15.9912 76.8992 6.87958 67.3658 6.87958C55.7792 6.87958 49.3075 20.3362 49.2525 20.4692C48.1983 23.045 43.9542 23.045 42.8954 20.4692C42.8312 20.3317 36.3642 6.87958 24.7729 6.87958H24.7683Z" />
                              </svg>
                            </div>
                          }
                          {comment.likeStatus === 1 ?
                            <p style={{ marginLeft: '12px', cursor: 'pointer', color: '#f9197f' }}>{comment.totalLikes}</p> :
                            <p className='numberOfLikes'>{comment.totalLikes}</p>
                          }
                        </div>
                      </div>
                    </div>

                  </div>
                })
              }

            </div>
          </div >
        </>
      }
    </>
  );
}
export default User;
