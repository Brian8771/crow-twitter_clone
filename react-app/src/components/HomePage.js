import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCaws, getCawFromId, likeCawThunk } from '../store/caws';
import { NavLink } from 'react-router-dom';
import CreateCaw from './CreateCaw';
import '../styles/Homepage.css'
import comment from '../images/comment.png';
import likeIcon from '../images/like.png';
import likedIcon from '../images/liked.png'
import { getAllUsers } from '../store/session';
import EditCaw from './EditCaw';

const HomePage = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);
    const caws = Object.values(useSelector(state => state.caws.caws))
    const cawses = useSelector(state => state.caws.caws);
    const users = useSelector(state => state.session.users);

    const handleLikes = async (id) => {
        await dispatch(likeCawThunk(id))
        setLoaded(false)
        await getAllCaws()
        setLoaded(true)

    }

    useEffect(() => {
        dispatch(getAllCaws()).then(dispatch(getAllUsers())).then(() => setLoaded(true))
    }, [dispatch, CreateCaw])


    return (
        <div className='homePageContainer' >
            <div >
                <div style={{ position: 'sticky', top: '0' }}>
                    <h1 className='header' style={{ fontSize: '20px', color: 'white', backgroundColor: 'black' }}>Home</h1>
                </div>
                <div style={{ borderBottom: 'black .5px solid' }}>
                    <CreateCaw setLoaded={setLoaded} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                    {caws && users && loaded &&
                        caws.map(caw => {
                            return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: 'black .5px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid' }}>
                                <div>
                                    <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={caw.user.profileImage} alt='profilePic' />
                                </div>
                                <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '85%' }}>
                                    <NavLink style={{ textDecoration: 'none' }} to={`/users/${caw.user.id}`}>

                                        <p className='pTag'>{caw.user.username} <span style={{ color: 'gray' }}>@{caw.user.username}</span></p>
                                    </NavLink>
                                    <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
                                        <p className='pTag' style={{ paddingTop: '10px' }} >{caw.caw}</p>
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
            </div>
        </div>

    )
}

export default HomePage
