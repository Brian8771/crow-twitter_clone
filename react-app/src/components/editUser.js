import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllCaws, getCawsFromUserId } from '../store/caws';
import { editUser, getCurretProfile } from '../store/session';
import '../styles/LoginForm.css';

const EditUser = ({ hideModal, setLoaded }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const edit_user = useSelector(state => state.session.user)
    const [bio, setBio] = useState(edit_user.bio)
    const [username, setUsername] = useState(edit_user.username)
    const [profile_image, setProfile_image] = useState(edit_user.profileImage)
    const [header_image, setHeader_image] = useState(edit_user.headerImage);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        const userInfo = {
            bio,
            username,
            profile_image,
            header_image
        }
        await dispatch(editUser(edit_user.id, userInfo));
        await dispatch(getCurretProfile(edit_user.id));
        await dispatch(getCawsFromUserId(edit_user.id));
        setLoaded(false)
        setLoaded(true)
        await dispatch(getAllCaws())
        hideModal()
        // history.push(`/${edit_caw.id}`)
        setBio('');
        // history.push('/1')
        // history.push('/')
    }

    return (
        <form className='editUserModal' onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                <div>
                    <h2>Edit User</h2>
                </div>
                <div>
                    {errors &&
                        errors.map((error, ind) => (
                            <div style={{ color: 'red', marginBottom: '10px' }} key={ind}>{error}</div>
                        ))
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '70%', alignItems: 'center' }}>
                    <input
                        style={{ width: '90%', height: '5rem', border: 'none', resize: 'none', marginBottom: '10px' }}
                        type='text'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <input
                        style={{ width: '90%', height: '5rem', border: 'none', resize: 'none', marginBottom: '10px' }}
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        style={{ width: '90%', height: '5rem', border: 'none', resize: 'none', marginBottom: '10px' }}
                        type='text'
                        value={profile_image}
                        onChange={(e) => setProfile_image(e.target.value)}
                    />
                    <input
                        style={{ width: '90%', height: '5rem', border: 'none', resize: 'none', marginBottom: '10px' }}
                        type='text'
                        value={header_image}
                        onChange={(e) => setHeader_image(e.target.value)}
                    />
                    <button className='submitButton' type='submit'>Edit</button>
                </div>
            </div>
        </form>
    )
}

export default EditUser
