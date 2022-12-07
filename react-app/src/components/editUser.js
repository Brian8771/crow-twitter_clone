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

    useEffect(() => {
        const newErrors = []
        if (username.length > 15) {
            newErrors.push('Username cannot be more than 15 characters long')
        }
        if (username.length === 0) {
            newErrors.push('Username cannot be empty')
        }
        if (username.match(/^\s*$/) && username.length > 0) {
            newErrors.push('Username cannot be empty')
        }
        // if (!profile_image.endsWith('.png') || !profile_image.endsWith('.jpg')) {
        //     newErrors.push('Profile Image must end with .png')
        // }
        // if (!header_image.endsWith('.png') || !header_image.endsWith('.jpg')) {
        //     newErrors.push('Header Image must end with .png')
        // }
        if (bio.length === 0) {
            newErrors.push('Bio cannot be empty')
        }
        if (bio.match(/^\s*$/) && bio.length > 0) {
            newErrors.push('Bio cannot be empty')
        }
        if (bio.length > 160) {
            newErrors.push('Bio cannot be longer than 160 characters')
        }
        setErrors(newErrors)
    }, [profile_image, username, header_image, bio])

    return (
        <form className='editUserModal' onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                <div>
                    <h2 className='text-2xl font-black mb-4'>Edit User</h2>
                </div>
                <div>
                    {errors &&
                        errors.map((error, ind) => (
                            <div style={{ color: 'red', marginBottom: '10px' }} key={ind}>{error}</div>
                        ))
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                        <label style={{ width: '2rem' }}>
                            Username
                        </label>
                        <input
                            className='text-black text-sm'
                            style={{ width: '60%', height: '2rem', border: 'none', resize: 'none', marginBottom: '10px' }}
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                        <label style={{ width: '2rem' }}>
                            Bio
                        </label>
                        <textarea
                            className='text-black text-sm'
                            style={{ width: '60%', height: '6rem', border: 'none', resize: 'none', marginBottom: '10px' }}
                            type='text'
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                        <label style={{ width: '2rem' }}>
                            Profile Image
                        </label>
                        <input
                            className='text-black text-sm'
                            style={{ width: '60%', height: '2rem', border: 'none', resize: 'none', marginBottom: '10px' }}
                            type='text'
                            value={profile_image}
                            onChange={(e) => setProfile_image(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                        <label style={{ width: '2rem' }}>
                            Header Image
                        </label>
                        <input
                            className='text-black text-sm'
                            style={{ width: '60%', height: '2rem', border: 'none', resize: 'none', marginBottom: '10px' }}
                            type='text'
                            value={header_image}
                            onChange={(e) => setHeader_image(e.target.value)}
                        />
                    </div>
                    <button className='submitButton' disabled={errors.length > 0 ? true : false} type='submit'>Edit</button>
                </div>
            </div>
        </form>
    )
}

export default EditUser
