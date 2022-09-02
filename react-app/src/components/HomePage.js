import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCaws, getCawFromId } from '../store/caws';
import { NavLink } from 'react-router-dom';
import CreateCaw from './CreateCaw';
import '../styles/Homepage.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);
    const caws = Object.values(useSelector(state => state.caws.caws))
    const cawses = useSelector(state => state.caws.caws);
    console.log(caws)


    useEffect(() => {
        dispatch(getAllCaws()).then(() => setLoaded(true))
    }, [dispatch, CreateCaw, cawses])


    return (
        <div className='homePageContainer' >
            <div >
                <div>
                    <h1 className='header'>Home</h1>
                </div>
                <div style={{ borderBottom: 'black .5px solid' }}>
                    <CreateCaw setLoaded={setLoaded} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                    {caws && loaded &&
                        caws.map(caw => {
                            return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: 'black .5px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid' }}>
                                <div>
                                    <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={caw.user.profileImage} alt='profilePic' />
                                </div>
                                <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <NavLink style={{ textDecoration: 'none' }} to={`/${caw.id}`}>
                                        <p className='pTag'>{caw.user.username} <span style={{ color: 'gray' }}>@{caw.user.username}</span></p>
                                    </NavLink>
                                    <p className='pTag' >{caw.caw}</p>
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
