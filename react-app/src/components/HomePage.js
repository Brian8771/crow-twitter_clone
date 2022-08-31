import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCaws } from '../store/caws';
import '../styles/Homepage.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);
    const caws = Object.values(useSelector(state => state.caws.caws))

    useEffect(() => {
        dispatch(getAllCaws()).then(() => setLoaded(true))
    }, [])


    return (
        <div className='homePageContainer' >
            <div>
                <h1 className='header'>Home</h1>
            </div>
            <div style={{ borderBottom: 'black .5px solid' }}>
                <h1 className='header'>
                    Create a caw
                    this will be filled later just want to leave room
                </h1>
            </div>
            <div >
                <div>
                    {loaded &&
                        caws.map(caw => {
                            { console.log(caw.user.profileImage) }
                            return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: 'black .5px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid' }}>
                                <div>
                                    <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={caw.user.profileImage} alt='profilePic' />
                                </div>
                                <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <p className='pTag'>{caw.user.username} <span style={{ color: 'gray' }}>@{caw.user.username}</span></p>
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
