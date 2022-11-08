import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCaws, likeCawThunk } from '../store/caws';
import { NavLink } from 'react-router-dom';
import CreateCaw from './CreateCaw';
import '../styles/Homepage.css'
import comment from '../images/comment.png';
import likeIcon from '../images/like.png';
import likedIcon from '../images/liked.png'
import { getAllUsers, getFollowings } from '../store/session';

const HomePage = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);
    const caws = Object.values(useSelector(state => state.caws.caws))
    const cawses = useSelector(state => state.caws.caws);
    const users = useSelector(state => state.session.users);
    const session = useSelector(state => state.session.user);
    const following = Object.values(useSelector(state => state.session.followings))

    const handleLikes = async (id) => {
        await dispatch(likeCawThunk(id))
        setLoaded(false)
        await getAllCaws()
        setLoaded(true)

    }

    const followerCaws = () => {
        let arr = []
        arr.push(session.id)
        let newArr = []
        for (let user of following) arr.push(user.id)
        // console.log('arr', arr)
        for (let caw of caws) {
            // console.log('caw', caw)
            // console.log(follows)
            if (arr.includes(caw.user.id)) newArr.push(caw)
        }
        return newArr
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
            res = `${week}w`
        }
        else if (day > 0) {
            res = `${day}d`
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

    // console.log(followerCaws())
    // console.log(caws)

    useEffect(() => {
        dispatch(getAllCaws()).then(dispatch(getAllUsers())).then(dispatch(getFollowings(session.id))).then(() => setLoaded(true))
    }, [dispatch, CreateCaw])


    return (
        <div className='homePageContainer' >
            <div >
                <div style={{ position: 'sticky', top: '0' }}>
                    <h1 className='header' style={{ fontSize: '20px', color: 'white', backgroundColor: 'black' }}>Home</h1>
                </div>
                <div >
                    <CreateCaw setLoaded={setLoaded} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                    {followerCaws().length > 0 && caws && users && loaded ?
                        followerCaws().map(caw => {
                            return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: '#2f3336 1px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', backgroundColor: 'black' }}>
                                <div>
                                    <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={caw.user.profileImage} alt='profilePic' />
                                </div>
                                <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '85%' }}>
                                    <NavLink style={{ textDecoration: 'none' }} to={`/users/${caw.user.id}`}>

                                        <p style={{ color: 'white' }} className='pTag'>{caw.user.firstName} <span style={{ color: 'gray' }}>@{caw.user.username} <span style={{ marginLeft: '6px' }}>{timeAfterCreated(caw)}</span></span></p>
                                    </NavLink>
                                    <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
                                        <p className='pTag' style={{ paddingTop: '10px', color: 'white' }} >{caw.caw}</p>
                                        {caw.image && <img className='cawImage' src={caw.image} alt='image' />}
                                    </NavLink>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                        <div className='likeButton' onClick={() => handleLikes(caw.id)} >
                                            {caw.likeStatus === 1 ?
                                                <img src={likedIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                                                :
                                                // <img src={likeIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                                                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 93 87" fill="none">
                                                    <path d="M46.0625 86.6892H45.9983C34.1596 86.4692 0 55.605 0 26.3725C0 12.3292 11.5729 0 24.7637 0C35.2596 0 42.3179 7.24167 46.0579 12.5125C49.7887 7.25083 56.8471 0 67.3475 0C80.5475 0 92.1158 12.3292 92.1158 26.3771C92.1158 55.6004 57.9517 86.4646 46.1129 86.68H46.0625V86.6892ZM24.7683 6.87958C15.235 6.87958 6.87958 15.9912 6.87958 26.3817C6.87958 52.69 39.1187 79.53 46.0671 79.8142C53.0246 79.53 85.2546 52.6946 85.2546 26.3817C85.2546 15.9912 76.8992 6.87958 67.3658 6.87958C55.7792 6.87958 49.3075 20.3362 49.2525 20.4692C48.1983 23.045 43.9542 23.045 42.8954 20.4692C42.8312 20.3317 36.3642 6.87958 24.7729 6.87958H24.7683Z" fill="#71767A" />
                                                </svg>
                                            }
                                            <p style={{ marginLeft: '12px', cursor: 'pointer', color: '#464a4c' }}>{caw.totalLikes}</p>
                                        </div>
                                        <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
                                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0px', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                {/* <img style={{ height: '16px' }} src={comment} alt='comment' /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 140 140" fill="none">
                                                    <path d="M81.935 13.0783L57.7383 13.02H57.7267C32.2117 13.02 12.2267 33.0108 12.2267 58.5317C12.2267 82.4367 30.8117 100.567 55.7725 101.523V123.853C55.7725 124.483 56.0292 125.522 56.4725 126.204C57.3008 127.517 58.7125 128.228 60.1592 128.228C60.9642 128.228 61.775 128.007 62.5042 127.54C64.0442 126.56 100.263 103.39 109.684 95.4217C120.779 86.03 127.418 72.2633 127.435 58.6017V58.5025C127.4 33.0283 107.427 13.0783 81.935 13.0725V13.0783ZM104.026 88.7483C97.4108 94.3483 75.6642 108.611 64.5225 115.833V97.2417C64.5225 94.8267 62.5683 92.8667 60.1475 92.8667H57.8375C36.4875 92.8667 20.9825 78.4233 20.9825 58.5317C20.9825 37.9167 37.1292 21.77 57.7325 21.77L81.9233 21.8283H81.935C102.538 21.8283 118.685 37.9633 118.697 58.555C118.679 69.6967 113.202 80.9783 104.032 88.7483H104.026Z" fill="#71767A" />
                                                </svg>
                                                <p style={{ marginLeft: '8px', color: '#464a4c' }}>{caw.totalComments}</p>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>

                            </div>
                        }) :
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '90%', display: 'flex', justifyContent: 'center' }}>
                                {loaded && <h1 style={{ color: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Follow Users to see their Caws</h1>}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div >

    )
}

export default HomePage
