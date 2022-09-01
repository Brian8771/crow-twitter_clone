import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getCawFromId } from '../store/caws';
import '../styles/Homepage.css'
import backArrow from '../images/arrow-back.svg'

const PostDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false);
    const caw = useSelector(state => state.caws.caw);
    console.log(caw)

    useEffect(() => {
        dispatch(getCawFromId(id)).then(() => setIsLoaded(true))
    }, [dispatch]);


    return (
        <div className='homePageContainer'>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <NavLink style={{ textDecoration: 'none' }} to='/'>
                    <img style={{ height: '20px', width: '20px' }} src={backArrow} alt='backarrow' />
                </NavLink>
                <h2 style={{ marginLeft: '20px', color: 'black' }}>Thread</h2>
            </div>
            {isLoaded && caw &&
                <div>
                    <div>
                        <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={caw.user.profileImage} alt='profilePic' />
                    </div>
                    <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <p className='pTag'>{caw.user.username} <span style={{ color: 'gray' }}>@{caw.user.username}</span></p>
                        <p className='pTag' >{caw.caw}</p>
                    </div>
                </div>

            }
        </div>


    )
}

export default PostDetail
