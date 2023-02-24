import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createCaw, getAllCaws } from '../store/caws';
import '../styles/Homepage.css'
import UploadPicture from './imageUploader';


const CreateCaw = ({ setLoaded, setLoader }) => {
    const [errors, setErrors] = useState([]);
    const [caw, setCaw] = useState('');
    const [image, setImg] = useState('');
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (caw.length === 0) {
            return setErrors(["Can't post an empty caw"])
        }

        if (caw.match(/^\s*$/)) {
            return setErrors(["Can't post an empty caw"])
        }
        let cawInfo = {
            caw
        }
        if (image) cawInfo = { caw, image }
        let cawCreated = await dispatch(createCaw(cawInfo));
        // await setLoaded(false);
        await setLoader(true)
        await dispatch(getAllCaws());
        await setLoader(false)
        // await setLoaded(true)
        // await setErrors(cawCreated)
        setCaw('');
        setImg('')
        // history.push('/1')
        // history.push('/')
    }


    useEffect(() => {
        if (caw.length > 180) {
            setErrors(["Caw can't be more than 180 characters"])
        }
        else setErrors(null);
    }, [caw])

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: '#2f3336 1px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', margin: '0', backgroundColor: 'black' }}>
            <div className='px-2.5 py-1.5 mr-3.5'>
                <img className='h-12 w-14 rounded-full' src={user.profileImage} alt='profilePic' />
            </div>
            <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                <form id='submit-caw' onSubmit={handleSubmit} className='pTag' >
                    <div>
                        {errors &&
                            errors.map((error, ind) => (
                                <div style={{ color: 'red' }} key={ind}>{error}</div>
                            ))
                        }
                    </div>
                    <div>
                        <textarea
                            style={{ width: '90%', height: '6rem', border: 'none', resize: 'none', backgroundColor: 'black', color: 'white' }}
                            type='text'
                            value={caw}
                            placeholder="What's on your mind?"
                            onChange={(e) => setCaw(e.target.value)}
                        />
                    </div>
                    {image && <img className='cawImage pb-5' src={image} alt='image' />}
                </form>
                <div className='flex justify-between'>
                    <UploadPicture setImg={setImg} />
                    <button form='submit-caw' type='submit' className='h-10 w-20 font-bold rounded-full m-0  bg-white text-black transition-all duration-500 hover:bg-grayish text-base disabled:bg-black'>Caw</button>
                </div>
            </div>

        </div>
    )
}

export default CreateCaw
