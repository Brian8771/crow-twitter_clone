import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getCawFromId, deleteCaw, getAllCaws } from '../store/caws';
import EditFormModal from './EditFormModal';
import '../styles/Homepage.css'
import backArrow from '../images/arrow-back.svg'

const PostDetail = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false);
    const caw = useSelector(state => state.caws.caw);
    const user = useSelector(state => state.session.user);
    const [editModal, setEditModal] = useState(false);

    const delete_caw = async (id) => {
        await dispatch(deleteCaw(id));
        await dispatch(getAllCaws());
        history.push('/');
    }

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
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <div>
                        <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={caw.user.profileImage} alt='profilePic' />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100vh' }}>
                        <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <p className='pTag'>{caw.user.username} <span style={{ color: 'gray' }}>@{caw.user.username}</span></p>
                            <p className='pTag' >{caw.caw}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            {caw.user.id === user.id && <button style={{ backgroundColor: 'black', padding: '0', margin: '0', height: '50%', width: '20%', borderRadius: '40px' }} onClick={() => delete_caw(caw.id)}>Delete</button>}
                            {caw.user.id === user.id && <EditFormModal setShowModal={setEditModal} caw={caw.id} />}
                        </div>
                    </div>

                </div>

            }
        </div>


    )
}

export default PostDetail
