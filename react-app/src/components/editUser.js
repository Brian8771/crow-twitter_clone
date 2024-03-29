import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCaws, getCawsFromUserId } from '../store/caws';
import { editUser, getCurretProfile } from '../store/session';
import UploadProfilePicture from './ProfileUploader';
import UploadHeaderPicture from './HeaderUploader';
import '../styles/LoginForm.css';

const EditUser = ({ hideModal, setLoaded }) => {
    const dispatch = useDispatch()
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
        setBio('');
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

    function handleChange(event) {
        setBio(event.target.value)
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    }
    console.log(profile_image)

    return (
        <>
            <form className='editUserModal' onSubmit={handleSubmit}>
                <div className='sticky top-0 flex justify-between w-full items-center px-4 py-3'>
                    <div className='flex items-center'>
                        <p className='cursor-pointer' onClick={() => hideModal()}>X</p>
                        <h2 className='text-xl font-semibold ml-5'>Edit Profile</h2>
                    </div>
                    <button className='submitButton text-sm  ' disabled={errors.length > 0 ? true : false} type='submit'>Save</button>
                </div>
                <div className='h-full w-full flex justify-start flex-col'>
                    <div className='relative flex justify-start w-full flex-col'>
                        <div className='relative'>
                            <UploadHeaderPicture setImage={setHeader_image} />
                            <img className='h-40 w-full object-cover' src={header_image} alt='headerImage' />
                        </div>
                        <div className='w-5/6 m-auto relative bottom-20'>
                            <UploadProfilePicture setImg={setProfile_image} />
                            <img className='h-36 w-36 rounded-full' src={profile_image} alt='profileImage' />
                        </div>
                    </div>
                    <div className='flex items-center flex-col'>
                        {errors &&
                            errors.map((error, ind) => (
                                <div style={{ color: 'red', marginBottom: '10px' }} key={ind}>{error}</div>
                            ))
                        }
                    </div>
                    <div className='flex justify-center flex-col w-full items-center'>
                        <div className='group flex w-5/6 flex-col border border-gray-500 px-3 py-1 mb-4 rounded focus-within:border-white'>
                            <label className='text-xs text-gray-500 group-focus-within:text-white'>
                                Username
                            </label>
                            <input
                                className='text-white bg-black'
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='group flex w-5/6 flex-col border border-gray-500 px-3 py-1 mb-4 rounded focus-within:border-white'>
                            <label className='text-gray-500 flex justify-between text-xs group-focus-within:text-white'>
                                <p>
                                    Bio
                                </p>
                                <p className=' text-transparent group-focus-within:text-white'>{bio.length} / 160 </p>
                            </label>
                            <textarea
                                onChange={handleChange}
                                className='myTextarea bio text-white bg-black resize-none overflow-y-hidden duration-300'
                                type='text'
                                value={bio}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditUser
